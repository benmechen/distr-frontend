import { CaretLeft } from 'phosphor-react';

interface IBack {
	onBack: () => void;
}
const Back = ({ onBack }: IBack) => (
	<button
		className="text-white flex items-center justify-center gap-1"
		onClick={onBack}
	>
		<CaretLeft color="white" size={20} />
		Back
	</button>
);
export default Back;
