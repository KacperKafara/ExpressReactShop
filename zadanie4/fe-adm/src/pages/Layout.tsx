import { FC } from "react";
import Header from "../components/Header";

interface Props {
    children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div className="bg-dark_gray text-white_text h-screen flex flex-col items-center">
            <Header />
            <main className="w-9/12">{children}</main>
        </div>
    );
}

export default Layout;