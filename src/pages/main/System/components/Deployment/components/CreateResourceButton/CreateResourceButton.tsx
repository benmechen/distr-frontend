import { Plus } from 'phosphor-react';
import { gray } from 'tailwindcss/colors';

export interface ICreateResourceButton {}

const CreateResourceButton = ({}: ICreateResourceButton) => (
	<button className="w-full p-4 border-t border-b border-gray-100 flex items-center justify-center gap-2">
		<Plus color={gray[900]} size="1rem" weight={'light'} />
		<span className="font-light">Create new resource</span>
	</button>
);
export default CreateResourceButton;
