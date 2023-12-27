import { FC, useEffect, useState } from 'react';
import { API } from '../../api/api.config';
import { Product } from '../../types/Product';

const MainPage: FC = () => {
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
        };

        fetchProducts();
    }, []);

    console.log('Products:', products);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        {product.name} - {product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainPage;
