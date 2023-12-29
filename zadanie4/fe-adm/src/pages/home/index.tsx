import { FC, useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../../api/api.config";
import { Product } from "../../types/Product";

const Home: FC = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get('/products');
                const data = response.data as Product[];
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, []);

    const handleUpdate = async (id: string) => {
        console.log(id);
    }

    return (
        <Layout>
            <table className='table-auto mt-5 w-full'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Description</th>
                        <th className='px-4 py-2'>Price</th>
                        <th className='px-4 py-2'>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td className='border px-4 py-2'>{product.name}</td>
                            <td className='border px-4 py-2'>{product.description}</td>
                            <td className='border px-4 py-2'>{product.price}</td>
                            <td className='text-center border px-4 py-2 hover:text-nice_green hover:cursor-pointer' onClick={() => {
                                handleUpdate(product._id);
                            }}>Buy</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default Home;