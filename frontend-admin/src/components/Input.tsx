import { FC } from "react";

interface InputProps {
    type: string;
    value: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
}

const Input: FC<InputProps> = ({ type, value, onChange, min }) => {
    return (
        <input className="bg-transparent w-full focus:outline-none"
            type={type}
            value={value}
            onChange={onChange}
            min={min} />
    );
};

export default Input;