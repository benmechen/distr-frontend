import { DotsThree } from 'phosphor-react';
import { gray } from 'tailwindcss/colors';

interface IOptionsButton {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const OptionsButton = ({ onClick }: IOptionsButton) => (
    <button onClick={onClick}>
        <DotsThree color={gray[900]} size="2rem" />
    </button>
);
export default OptionsButton;
