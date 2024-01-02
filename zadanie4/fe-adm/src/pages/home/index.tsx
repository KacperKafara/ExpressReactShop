import { FC } from "react";
import Layout from "../Layout";
import ProductsTable from "../../templates/productsTable";
import OrdersTable from "../../templates/ordersTable";

const Home: FC = () => {
    return (
        <Layout>
            <>
                <ProductsTable />
                <OrdersTable />
            </>
        </Layout>
    );
}

export default Home;