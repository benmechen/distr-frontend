import { CaretRight } from 'phosphor-react';
import { gray } from 'tailwindcss/colors';

interface IView {
    hover?: boolean;
}
const View = ({ hover }: IView) => (
    <CaretRight
        size="1rem"
        color={gray[900]}
        className={`transition-transform duration-100 ${
            hover && 'translate-x-1'
        }`}
    />
);
export default View;
