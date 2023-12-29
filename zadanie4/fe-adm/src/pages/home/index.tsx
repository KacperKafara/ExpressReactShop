import { FC } from "react";
import Layout from "../Layout";

const Home: FC = () => {
    return (
        <Layout>
            <div className="text-center">
                <h1 className="text-5xl font-bold">Hello, world!</h1>
                <p className="text-2xl">Welcome to your FE-ADM app.</p>
            </div>
        </Layout>
    );
}

export default Home;