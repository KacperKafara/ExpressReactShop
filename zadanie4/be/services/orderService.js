import ProductRepo from '../Model/Product.js';
import StatusRepo from '../Model/OrderStatus.js';
import OrderRepo from '../Model/Order.js';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

function handleError(error) {
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
        handleError(error);
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
        handleError(error);
    }
}