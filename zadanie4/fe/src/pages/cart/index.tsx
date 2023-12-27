import { FC, useEffect, useState } from 'react';
import NavButton from '../../components/NavButton';
import { FaHome } from "react-icons/fa";
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import { LocalStorageProduct } from '../../types/LocalStorageProduct';

const CartPage: FC = () => {
    const navigation = useNavigate();
    const [products, setProducts] = useState<LocalStorageProduct[]>([]);

    useEffect(() => {
        const existingProducts = JSON.parse(localStorage.getItem('cart') || '[]');
        setProducts(existingProducts);
    }, []);

    const handleClick = () => {
        navigation('/');
    }

    function handleQuantityChange(productId: string, quantity: number): void {
        const existingProducts = JSON.parse(localStorage.getItem('cart') || '[]');
        const product = existingProducts.find((p: LocalStorageProduct) => p.product._id === productId);
        if (product) {
            product.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(existingProducts));
            setProducts(existingProducts);
        }
    }

    return (
        <Layout button={<NavButton onClick={handleClick} text='Home Page' icon={<FaHome />} />}>
            <table className='table-auto mt-5 w-full'>
                <thead>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Quantity</th>
                        <th className='px-4 py-2'>Price</th>
                        <th className='px-4 py-2'>Total</th>
                        <th className='px-4 py-2'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.product._id}>
                            <td className='border px-4 py-2'>{product.product.name}</td>
                            <td className='border px-4 py-2 w-3/12'>
                                <input
                                    type='number'
                                    className='text-white_text
                                    bg-dark_gray
                                    w-full'
                                    value={product.quantity}
                                    min={1}
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            product.product._id,
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </td>
                            <td className='border px-4 py-2'>{product.product.price}</td>
                            <td className='border px-4 py-2'>{product.quantity ? product.product.price * product.quantity : product.product.price}</td>
                            <td className='border px-4 py-2 text-center cursor-pointer hover:text-nice_green' onClick={() => {
                                const existingProducts = JSON.parse(localStorage.getItem('cart') || '[]');
                                const newProducts = existingProducts.filter((p: LocalStorageProduct) => p.product._id !== product.product._id);
                                localStorage.setItem('cart', JSON.stringify(newProducts));
                                setProducts(newProducts);
                            }}>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default CartPage;
