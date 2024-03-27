import { OrderStatus as OrderStatusRepo } from '../Model/OrderStatus.js';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export const getAllStatus = async (req, res) => {
    try {
        const status = await OrderStatusRepo.find();
        if (status.length == 0) return res.status(StatusCodes.NO_CONTENT).json(categories);
        else return res.status(StatusCodes.OK).json(status);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}
