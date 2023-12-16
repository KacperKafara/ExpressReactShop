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
        if (categories.length == 0) return res.status(StatusCodes.NO_CONTENT).json(categories);
        else return res.status(StatusCodes.OK).json(categories);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}
