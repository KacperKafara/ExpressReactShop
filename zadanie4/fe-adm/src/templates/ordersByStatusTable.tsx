import { FC, useEffect, useState } from "react";
import { Order } from "../types/Order";
import Cell from "../components/Cell";
import { OrderStatus } from "../types/OrderStatus";
import { API } from "../api/api.config";

interface Props {
    orders: Order[];
    setOrders?: (orders: Order[]) => void;
    calculateOrderTotal: (order: Order) => number;
    formatOrderDate: (date: Date) => string;
}

const OrdersByStatusTable: FC<Props> = ({ orders, calculateOrderTotal, formatOrderDate }) => {
    const [status, setStatus] = useState<OrderStatus[]>();
    // const [currentStatus, setCurrentStatus] = useState<OrderStatus>();
    const [currentOrders, setCurrentOrders] = useState<Order[]>([]);

    const filterOrders = (selectedStatus: OrderStatus | undefined) => {
        const filteredOrders = orders.filter(order => order.orderStatus._id === selectedStatus?._id);
        setCurrentOrders(filteredOrders);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatusId = e.target.value;
        const selectedStatus = status?.find(s => s._id === selectedStatusId);
        filterOrders(selectedStatus);
    }

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await API.get('/status/');
                const data = response.data as OrderStatus[];
                setStatus(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchStatuses();
    }, []);

    return (
        <div className="mt-6">
            <select className='border rounded p-1 text-dark_gray' onChange={handleChange}>
                <option value=''>Select status</option>
                {status?.map(s => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                ))}
            </select>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>Approval Date</th>
                        <th className='px-4 py-2'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order._id}>
                            <Cell>{formatOrderDate(order.approvalDate)}</Cell>
                            <Cell>{calculateOrderTotal(order)}</Cell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrdersByStatusTable;