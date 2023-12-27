import { FC, useEffect, useState } from 'react';
import { API } from '../../api/api.config';
import { Product } from '../../types/Product';
import Layout from '../Layout';
import NavButton from '../../components/NavButton';
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const MainPage: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
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

        fetchProducts();
    }, []);

    const handleClick = () => {
        navigation('/cart');
    }

    console.log('Products:', products);

    return (
        <Layout button={<NavButton onClick={handleClick} text='Cart' icon={<CiShoppingCart />} />}>
            <div>
                Main Page
            </div>
        </Layout>
    );
};

export default MainPage;
