interface ITertiaryButton
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
}

const TertiaryButton = ({ children, className, ...props }: ITertiaryButton) => (
	<button
		{...props}
		className={`text-gray-900 border-b border-gray-900 hover:pb-1 transition-all duration-100 inline-block w-fit ${className}`}
	>
		{children}
	</button>
);
export default TertiaryButton;
