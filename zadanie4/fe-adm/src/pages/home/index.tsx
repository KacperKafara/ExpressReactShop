import { FC, useEffect, useState } from "react";
import Layout from "../Layout";
import ProductsTable from "../../templates/productsTable";
import OrdersTable from "../../templates/ordersTable";
import { Order } from "../../types/Order";
import { API } from "../../api/api.config";

const Home: FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
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
        fetchOrders();
    }, []);

    return (
        <Layout>
            <>
                <ProductsTable />
                <OrdersTable orders={orders} setOrders={setOrders} />
            </>
        </Layout>
    );
}

export default Home;