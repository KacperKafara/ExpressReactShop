import { FC, useEffect, useState } from "react";
import { API } from "../api/api.config";
import { Order } from "../types/Order";
import Cell from "../components/Cell";
import { OrderStatus } from "../types/OrderStatus";

const OrdersTable: FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [canceledStatus, setCanceledStatus] = useState<OrderStatus>();
    const [completedStatus, setCompletedStatus] = useState<OrderStatus>();

    const calculateOrderTotal = (order: Order) => {
        let total = 0;
        order.products.forEach(product => {
            total += product.product.price * product.quantity;
        });
        return total;
    }

    const formatOrderDate = (date: Date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('pl-PL');
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await API.get('/orders');
                let data = response.data as Order[];
                data = data.filter(order => order.orderStatus.name != 'COMPLETED' && order.orderStatus.name != 'CANCELLED');
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchStatuses = async () => {
            try {
                const response = await API.get('/status/');
                const data = response.data as OrderStatus[];
                const completedStatus = data.find(status => status.name === 'COMPLETED');
                const canceledStatus = data.find(status => status.name === 'CANCELLED');
                setCanceledStatus(canceledStatus);
                setCompletedStatus(completedStatus);
            } catch (error) {
                console.error(error);
            }
        }

        fetchStatuses();
        fetchOrders();
    }, []);

    const handleClick = async (id: string, status: OrderStatus) => {
        const res = await API.get(`/orders/id/${id}`);
        const oldOrder = res.data as Order;
        const order = orders.find(order => order._id === id);
        if (!order || !oldOrder) {
            console.error('Order not found');
            return;
        }
        order.orderStatus = status;
        const diff = [{ op: 'replace', path: '/orderStatus', value: status._id }];
        try {
            await API.patch(`/orders/id/${id}`, diff);
            alert('Order updated');
        } catch (error) {
            console.error(error);
        }
        setOrders(orders.filter(order => order._id !== id));
    }

    return (
        <table className='table-auto mt-5 w-full'>
            <thead>
                <tr>
                    <th className='px-4 py-2'>Approval Date</th>
                    <th className='px-4 py-2'>Order Total</th>
                    <th className='px-4 py-2'>Order Details</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <Cell>{formatOrderDate(order.approvalDate)}</Cell>
                        <Cell>{calculateOrderTotal(order)}</Cell>
                        <Cell>
                            <ul>
                                {order.products.map(product => (
                                    <li key={product.product._id}>
                                        {product.product.name} - {product.quantity} pieces
                                    </li>
                                ))}
                            </ul>
                        </Cell>
                        <Cell>
                            <div className="flex justify-around">
                                <button className='text-white font-bold py-2 px-4 rounded border hover:border-nice_green' onClick={() => { completedStatus && handleClick(order._id, completedStatus) }}>Approve</button>
                                <button className='text-white font-bold py-2 px-4 rounded border hover:border-red-600' onClick={() => { canceledStatus && handleClick(order._id, canceledStatus) }}>Reject</button>
                            </div>
                        </Cell>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default OrdersTable;
