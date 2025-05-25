import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function Button({children, ...props}: ButtonProps){
    return(
        <button className="p-2 bg-blue-600 rounded-md text-white mr-4 font-bold font-gabarito"
            {...props}
        >{children}</button>
    )
}