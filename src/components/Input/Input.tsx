import React from 'react';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInput>(
	({ className, children, ...props }, ref) => (
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
