import CartPage from "../pages/cart";
import MainPage from "../pages/main";
import { RouteType } from "./Route";
import { Pathnames } from "./pathnames";

export const publicRoutes: RouteType[] = [
    {
        path: Pathnames.main,
        Component: MainPage,
    },
    {
        path: Pathnames.cart,
        Component: CartPage,
    },
];