import { OrderStatus } from "./OrderStatus";
import { Product } from "./Product";

export interface Order {
    _id: string,
    approvalDate: Date,
    orderStatus: OrderStatus,
    username: string,
    email: string,
    phoneNumber: string,
    products: [
        {
            quantity: number,
            product: Product,
        }
    ],
}