import { X } from 'phosphor-react';
import { gray } from 'tailwindcss/colors';

interface IClose {
	onClick?: () => void;
}
const Close = ({ onClick }: IClose) => (
	<button onClick={onClick}>
		<X color={gray[900]} size={25} />
	</button>
);
export default Close;
