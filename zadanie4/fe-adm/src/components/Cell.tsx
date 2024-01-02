import { FC } from "react";

interface CellProps {
    children: React.ReactNode;
}


const Cell: FC<CellProps> = ({ children }) => {
    return (
        <td className='border px-4 py-2'>{children}</td>
    );
}

export default Cell;