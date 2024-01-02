import { FC, useEffect, useState } from "react";
import { Product } from "../types/Product";
import { API } from "../api/api.config";
import Input from "../components/Input";
import { compare } from "fast-json-patch";
import Error from "../components/Error";
import Cell from "../components/Cell";


const ProductsTable: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string>('');

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

    const handleChange = (id: string, value: string | number, field: string) => {
        setProducts(products.map(product => {
            if (product._id === id) {
                return {
                    ...product,
                    [field]: value
                }
            }
            return product;
        }));
    }

    const handleUpdate = async (id: string) => {
        const product = products.find(product => product._id === id);
        if (!product) {
            console.error('Product not found');
            return;
        }
        if (!product.name || !product.description || !product.price) {
            setError('All fields are required');
            return;
        }
        if (product.price < 1) {
            setError('Price must be greater than 0');
            return;
        }
        const oldProduct = await API.get(`/products/${id}`) as Product;
        const diff = compare(oldProduct, product);
        try {
            await API.patch(`/products/${id}`, diff);
            alert('Product updated');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {error && <Error value={error} />}
            <table className='table-auto mt-5 w-full'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Description</th>
                        <th className='px-4 py-2'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <Cell>
                                <Input type='text' value={product.name} onChange={e => {
                                    const value = e.target.value.replace(' ', '');
                                    handleChange(product._id, value, 'name');
                                }} />
                            </Cell>
                            <Cell>
                                <Input type='text' value={product.description} onChange={e => {
                                    const value = e.target.value.replace(' ', '');
                                    handleChange(product._id, value, 'description');
                                }} />
                            </Cell>
                            <Cell>
                                <Input type='number' value={product.price} onChange={e => {
                                    handleChange(product._id, e.target.value, 'price');
                                }} min={1} />
                            </Cell>
                            <td className='text-center border px-4 py-2 hover:text-nice_green hover:cursor-pointer' onClick={() => {
                                handleUpdate(product._id);
                            }}>Update</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ProductsTable;