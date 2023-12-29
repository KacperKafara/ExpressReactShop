import OrderRepo from '../Model/Order.js';
import { OrderStatus as OrderStatusRepo, OrderStatusValue } from '../Model/OrderStatus.js';
import ProductRepo from '../Model/Product.js';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import jsonpatch from 'fast-json-patch';

function handleError(error, res) {
    if (error.name == 'ValidationError') {
        const validationErrors = Object.values(error.errors).map((validationError) => validationError.message);
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Validation error.', errors: validationErrors });
    } else if (error.name == 'CastError') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Given ID is not type of ObjectID.' })
    };
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
}

export const getOrders = async (req, res) => {
    try {
        const orders = await OrderRepo.find();
        if (orders.length == 0) {
            return res.status(StatusCodes.NO_CONTENT).json(orders);
        }
        else return res.status(StatusCodes.OK).json(orders);
    } catch {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Id is mandatory.' });
        }
        const order = await OrderRepo.findById(id);
        if (order) {
            return res.status(StatusCodes.OK).json(order);
        } else {
            return res.status(StatusCodes.NO_CONTENT).json(null);
        }
    } catch (error) {
        handleError(error, res);
    }
}

export const getOrdersByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Username is mandatory.' });
        }

        const orders = await OrderRepo.find({ 'user.username': username });
        if (orders.length == 0) {
            return res.status(StatusCodes.NO_CONTENT).json(orders);
        }
        else return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        handleError(error, res);
    }
}

export const getOrdersByStatus = async (req, res) => {
    try {
        const statusId = req.params.status;
        if (!statusId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Status is mandatory.' });
        }

        const orders = await OrderRepo.find({ 'status.id': statusId });
        if (orders.length == 0) {
            return res.status(StatusCodes.NO_CONTENT).json(orders);
        }
        else return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        handleError(error, res);
    }
}

export const addOrder = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request. Order data is missing.' });
        }

        const { approvalDate, orderStatusId, username, email, phoneNumber, products } = req.body;
        const orderStatus = await OrderStatusRepo.findById(orderStatusId);
        if (!orderStatus) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order status with given id does not exists.' });
        }

        const productsArray = [];

        for (let element of products) {
            const productId = element.productId;

            const product = await ProductRepo.findById(productId);
            if (!product) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: `Product with id ${productId} does not exists.` });
            }

            productsArray.push({
                product: product,
                quantity: element.quantity,
            });
        }

        const order = await OrderRepo.create({
            approvalDate: approvalDate == null ? null : new Date(approvalDate),
            orderStatus: orderStatus,
            username: username,
            email: email,
            phoneNumber: phoneNumber,
            products: productsArray,
        });
        return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        handleError(error, res);
    }
}

export const changeStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request. Order id is missing.' });
        }
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request. Order data is missing.' });
        }
        const order = await OrderRepo.findById(orderId);
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order with given id does not exist.' });
        }

        let orderStatus;

        for (const obj of req.body) {
            if (obj.path == '/orderStatus') {
                orderStatus = await OrderStatusRepo.findById(obj.value);
                if (!orderStatus) {
                    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order status with given id does not exists.' });
                }
                obj.value = orderStatus;
            }
        }
        if (OrderStatusValue[orderStatus.name] == 3) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Cannot change the status of an order that has been canceled.' })
        } else if (OrderStatusValue[orderStatus.name] < OrderStatusValue[order.orderStatus.name]) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: `Failed to change status from ${order.orderStatus.name} to ${orderStatus.name}` });
        }

        jsonpatch.applyPatch(order, req.body);
        const updatedOrder = await order.save();
        return res.status(StatusCodes.OK).json(updatedOrder);
    } catch (error) {
        handleError(error, res);
    }
}