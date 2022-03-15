import React from 'react';

type IInput = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, IInput>(
    ({ className, ...props }, ref) => (
        <input
            {...props}
            ref={ref}
            className={`rounded-lg bg-gray-100 outline-none border-none py-3 px-6 w-full ${
                props.disabled && 'opacity-60'
            } ${className}`}
        />
    ),
);
export default Input;
