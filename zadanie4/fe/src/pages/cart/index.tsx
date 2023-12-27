import { FC } from 'react';
import NavButton from '../../components/NavButton';
import { FaHome } from "react-icons/fa";
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';

const CartPage: FC = () => {
    const navigation = useNavigate();

    const handleClick = () => {
        navigation('/');
    }

    return (
        <Layout button={<NavButton onClick={handleClick} text='Home Page' icon={<FaHome />} />}>
            <div>
                Cart Page
            </div>
        </Layout>
    );
};

export default CartPage;
