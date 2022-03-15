import { Plus } from 'phosphor-react';
import { useModal } from '../../../../../components/Modal';
import { useCreateSystemMutation } from '../../../../../generated/graphql';
import { Card } from '../Card';
import { CreateSystemForm } from './components/CreateSystemForm';
import { ICreateSystemFormData } from './components/CreateSystemForm/CreateSystemForm';

const CreateSystemCard = () => {
    const [Modal, { open, close }] = useModal();
    const [, createSystem] = useCreateSystemMutation();

    const handleCreateSystem = async (data: ICreateSystemFormData) => {
        await createSystem({
            input: data,
        });
        close();
    };

    return (
        <>
            <Modal title="Create System">
                <CreateSystemForm onSubmit={handleCreateSystem} />
            </Modal>
            <Card onClick={open}>
                <Plus size={50} />
            </Card>
        </>
    );
};

export default CreateSystemCard;
