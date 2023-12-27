import { FC } from "react";

interface Props {
    button: JSX.Element;
}

const Nav: FC<Props> = ({ button }) => {
    return (
        <nav className="flex justify-between pl-10 pr-10 pt-2 pb-2 border-b border-white_text w-10/12">
            <p className="font-dancing font-bold text-xl">Online shop</p>
            {button}
        </nav>
    );
};

export default Nav;