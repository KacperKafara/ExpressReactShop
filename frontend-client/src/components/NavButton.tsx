import { FC } from "react";

interface Props {
    text: string;
    icon: React.ReactElement;
    onClick?: () => void;
}

const NavButton: FC<Props> = ({ text, icon, onClick }) => {
    return (
        <button className="flex items-center border-b border-nice_green hover:bg-nice_green hover:text-black rounded-sm p-1" onClick={onClick}>
            <span className="mr-1">{text}</span> {icon}
        </button>
    );
};

export default NavButton;