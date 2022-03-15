import { Plus } from 'phosphor-react';
import { useState } from 'react';
import { useModal } from '../../../../../components/Modal';
import {
    Platform,
    useCreateServiceMutation,
} from '../../../../../generated/graphql';
import { Card } from '../../../Dashboard/components/Card';
import { CreateServiceForm } from './components/CreateServiceForm';
import { ICreateServiceFormData } from './components/CreateServiceForm/CreateServiceForm';

const CreateServiceCard = () => {
    const [Modal, { open, close }] = useModal();
    const [, createService] = useCreateServiceMutation();
    const [platform, setPlatform] = useState<Platform>(Platform.Aws);

    const handleCreateService = async (data: ICreateServiceFormData) => {
        await createService({
            input: {
                name: data.name,
                description: data.description,
                summary: data.summary,
                introspectionURL: data.introspectionUrl,
                serviceURL: data.serviceUrl,
                documentationURL: data.documentation,
                sourceCodeURL: data.sourceCode,
                platform,
            },
        });
        close();
    };

    return (
        <>
            <Modal title="Create Service">
                <CreateServiceForm
                    platform={platform}
                    setPlatform={setPlatform}
                    onSubmit={handleCreateService}
                />
            </Modal>
            <Card onClick={open}>
                <Plus size={50} />
            </Card>
        </>
    );
};

export default CreateServiceCard;
