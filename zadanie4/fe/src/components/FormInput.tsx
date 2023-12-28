import { FC } from "react";

interface FormInputProps {
    label: string;
    type: string;
    size?: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInputProps> = ({ label, type, size, value, onChange }) => {
    return (
        <div className="my-4">
            <label className="block text-white_text text-sm font-medium mb-2" htmlFor={label}>
                {label}
            </label>
            <input
                id={label}
                type={type}
                minLength={size}
                maxLength={size}
                value={value}
                onChange={onChange}
                required
                className="border border-white_text bg-dark_gray rounded w-full py-2 px-3 text-white_text leading-tight focus:outline-none focus:border-nice_green"
            />
        </div>
    )
}

export default FormInput;