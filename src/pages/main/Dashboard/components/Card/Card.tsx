import React from 'react';

interface ICard
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	children: React.ReactNode;
}
const Card = ({ children, ...props }: ICard) => (
	<div
		{...props}
		className={`bg-white overflow-hidden rounded-xl shadow-md hover:shadow-lg h-52 w-52 px-2 flex flex-col items-center justify-around transition-transform duration-100 hover:scale-105 ${props.className}`}
	>
		{children}
	</div>
);
export default Card;
