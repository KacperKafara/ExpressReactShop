import { FC, useEffect, useState } from "react";
import Layout from "../Layout";
import ProductsTable from "../../templates/productsTable";
import OrdersTable from "../../templates/ordersTable";
import { Order } from "../../types/Order";
import { API } from "../../api/api.config";
import OrdersByStatusTable from "../../templates/ordersByStatusTable";

const Home: FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        console.log('Home useEffect');
        const fetchOrders = async () => {
            try {
                const response = await API.get('/orders');
                setOrders(response.data as Order[]);
            } catch (error) {
                console.error(error);
            }
        }
        fetchOrders();
    }, []);

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

    return (
        <Layout>
            <>
                <ProductsTable />
                <OrdersTable orders={orders} setOrders={setOrders} calculateOrderTotal={calculateOrderTotal} formatOrderDate={formatOrderDate} />
                <OrdersByStatusTable orders={orders} calculateOrderTotal={calculateOrderTotal} formatOrderDate={formatOrderDate} />
            </>
        </Layout>
    );
}

export default Home;