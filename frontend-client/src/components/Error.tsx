import { FC } from "react"

interface ErrorProps {
    value: string;
}

const Error: FC<ErrorProps> = ({ value }) => {
    return (
        <div className="flex justify-center">
            <p className='py-1 border text-center mt-2 rounded-md w-5/12 border-nice_red text-nice_red'>{value}</p>
        </div>
    )
}

export default Error;