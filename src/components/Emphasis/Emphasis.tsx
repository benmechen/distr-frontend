interface IEmphasis {
	children: string;
	bold?: boolean;
}

const Emphasis = ({ bold = true, children }: IEmphasis) => (
	<span
		className={`${
			bold && 'font-bold'
		} text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500`}
	>
		{children}
	</span>
);
export default Emphasis;
