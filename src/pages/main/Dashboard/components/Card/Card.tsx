import React from 'react';

interface ICard
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	children: React.ReactNode;
	justify?: 'between' | 'around';
	disableHover?: boolean;
}
const Card = ({
	children,
	justify = 'around',
	disableHover,
	...props
}: ICard) => (
	<div
		{...props}
		className={`${
			props.onClick && 'cursor-pointer'
		} bg-white overflow-hidden rounded-xl shadow-md ${
			!disableHover && 'hover:shadow-lg'
		} h-52 w-52 px-2 flex flex-col items-center justify-${justify} transition-transform duration-100 ${
			!disableHover && 'hover:scale-105'
		} ${props.className}`}
	>
		{children}
	</div>
);
export default Card;
