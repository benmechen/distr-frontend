import { Plus } from 'phosphor-react';
import { useModal } from '../../../../../components/Modal';
import { Card } from '../Card';
import { CreateSystemForm } from './components/CreateSystemForm';

const CreateSystemCard = () => {
	const [Modal, { open }] = useModal();

	return (
		<>
			<Modal title="Create System">
				<CreateSystemForm onSubmit={() => {}} />
			</Modal>
			<Card onClick={open}>
				<Plus size={50} />
			</Card>
		</>
	);
};

export default CreateSystemCard;
