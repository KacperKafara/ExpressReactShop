import { FC, useEffect, useState } from 'react';
import { API } from '../../api/api.config';
import { Product } from '../../types/Product';
import Layout from '../Layout';
import NavButton from '../../components/NavButton';
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { Category } from '../../types/Category';

const MainPage: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [filter, setFilter] = useState<string>('');
    const navigation = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get('/products');
                const data = response.data as Product[];
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await API.get('/categories');
                const data = response.data as Category[];
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProducts();
        fetchCategories();
    }, []);

    const handleClick = () => {
        navigation('/cart');
    };

    const handleBuy = (id: string) => {
        console.log(id);
    }

    const filterProducts = products.filter((product) => {
        if (selectedCategory === 'all') {
            return product.name.toLowerCase().includes(filter.toLowerCase());
        } else {
            return product.name.toLowerCase().includes(filter.toLowerCase()) && product.category._id === selectedCategory;
        }
    });

    return (
        <Layout button={<NavButton onClick={handleClick} text='Cart' icon={<CiShoppingCart />} />}>
            <>
                <div className='flex justify-between text-black mt-5'>
                    <input className='w-1/3' type='text' placeholder='Filter by name' onChange={(e) => {
                        setFilter(e.target.value);
                    }} />
                    <select className='w-1/3' name="categories" id="categories" value={selectedCategory} onChange={(e) => {
                        setSelectedCategory(e.target.value);
                    }}>
                        <option value="all">All</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <table className='table-auto mt-5 w-full'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Description</th>
                            <th className='px-4 py-2'>Price</th>
                            <th className='px-4 py-2'> Buy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterProducts.map((product) => (
                            <tr key={product._id}>
                                <td className='border px-4 py-2'>{product.name}</td>
                                <td className='border px-4 py-2'>{product.description}</td>
                                <td className='border px-4 py-2'>{product.price}</td>
                                <td className='text-center border px-4 py-2 hover:text-nice_green hover:cursor-pointer' onClick={() => {
                                    handleBuy(product._id);
                                }}>Buy</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        </Layout>
    );
};

export default MainPage;
