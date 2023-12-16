import ProductRepo from '../Model/Product.js';
import CategoryRepo from '../Model/Category.js';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';


export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductRepo.find();
        if (products.length == 0) return res.status(StatusCodes.NO_CONTENT).json(products);
        else return res.status(StatusCodes.OK).json(products);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductRepo.findById(id);
        if (product) {
            return res.status(StatusCodes.OK).json(product);
        } else {
            return res.status(StatusCodes.NO_CONTENT).json(null);
        }
    } catch (error) {
        if (error.name == 'CastError') return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Given ID is not type of ObjectID.' });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}

export const addProduct = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request. Product data is missing.' });
        }

        const { name, description, price, weight, categoryId } = req.body;
        const category = await CategoryRepo.findById(categoryId);
        if (!category) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Category with given id does not exists.' });
        }
        const product = await ProductRepo.create({
            name: name,
            description: description,
            price: price,
            weight: weight,
            category: category,
        });
        return res.status(StatusCodes.CREATED).json(product);

    } catch (error) {
        if (error.name == 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((validationError) => validationError.message);
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Validation error.', errors: validationErrors });
        } else if (error.name == 'CastError') {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Given ID is not type of ObjectID.' })
        };
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}