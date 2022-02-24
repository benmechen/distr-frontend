interface IPlatform {
	selected: boolean;
	children: string;
	onClick?: () => void;
}
const Platform = ({ selected, children, onClick }: IPlatform) => (
	<button
		onClick={onClick}
		className={`w-1/4 h-full ${
			selected
				? 'text-white bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg'
				: 'text-indigo-500'
		} text-center text-xl flex items-center justify-center`}
	>
		{children}
	</button>
);
export default Platform;
