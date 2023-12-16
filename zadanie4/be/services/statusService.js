const OrderStatus = require('../Model/OrderStatus');

exports.getAllStatuses = async (req, res) => {
    try {
        const status = await OrderStatus.find();
        res.json(status);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}