import CategoryRepo from '../Model/Category.js';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryRepo.find();
        if (categories.length == 0) res.status(StatusCodes.NO_CONTENT).json(categories);
        else res.json(categories);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}
