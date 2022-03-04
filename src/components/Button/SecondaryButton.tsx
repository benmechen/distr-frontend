import React from 'react';

interface ISecondaryButton
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
}

const SecondaryButton = ({
	children,
	className,
	...props
}: ISecondaryButton) => (
	<button
		{...props}
		className={`p-0.5 rounded-lg bg-gradient-to-bl from-cyan-500 to-blue-500 ${className}`}
	>
		<div className="py-2.5 px-5 h-full w-full bg-white font-medium rounded-md">
			<span className="bg-gradient-to-bl from-cyan-500 to-blue-500 text-transparent bg-clip-text">
				{children}
			</span>
		</div>
	</button>
);
export default SecondaryButton;
