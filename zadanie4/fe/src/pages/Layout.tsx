import { FC } from "react";
import Nav from "../components/Nav";

interface Props {
    button: JSX.Element;
    children: JSX.Element;
}

const Layout: FC<Props> = ({ button, children }) => {
    return (
        <div className="bg-dark_gray text-white_text h-screen flex flex-col items-center">
            <Nav button={button} />
            <main className="w-9/12">{children}</main>
        </div>
    );
}

export default Layout;