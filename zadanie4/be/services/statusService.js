import OrderStatusRepo from '../Model/OrderStatus.js';
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export const getAllStatus = async (req, res) => {
    try {
        const status = await OrderStatusRepo.find();
        if (status.length == 0) res.status(StatusCodes.NO_CONTENT).json(categories);
        else res.json(status);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}
