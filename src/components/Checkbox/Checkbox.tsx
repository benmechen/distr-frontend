interface ICheckbox
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label?: string;
}
const Checkbox = ({ label, className, ...props }: ICheckbox) => (
	<div className={className}>
		<input
			type="checkbox"
			className="w-6 h-6 bg-gray-100 border-none rounded text-indigo-500 outline-none"
			{...props}
		/>
		<label className="text-sm font-thin ml-2">{label}</label>
	</div>
);

export default Checkbox;
