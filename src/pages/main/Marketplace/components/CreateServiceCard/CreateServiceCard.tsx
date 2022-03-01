import { Plus } from 'phosphor-react';
import { useModal } from '../../../../../components/Modal';
import { Card } from '../../../Dashboard/components/Card';
import { CreateServiceForm } from './components/CreateServiceForm';

const CreateServiceCard = () => {
	const [Modal, { open }] = useModal();

	return (
		<>
			<Modal title="Create Service">
				<CreateServiceForm onSubmit={() => {}} />
			</Modal>
			<Card onClick={open}>
				<Plus size={50} />
			</Card>
		</>
	);
};

export default CreateServiceCard;
