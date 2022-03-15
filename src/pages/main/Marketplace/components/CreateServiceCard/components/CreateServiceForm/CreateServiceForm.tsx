import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../../../../components/Button';
import { Input } from '../../../../../../../components/Input';
import { Platform as PlatformSelector } from '../../../../../../../components/Platform';
import { Textarea } from '../../../../../../../components/Textarea';
import { Platform } from '../../../../../../../generated/graphql';

export interface ICreateServiceFormData {
    name: string;
    serviceUrl: string;
    introspectionUrl: string;
    summary: string;
    documentation: string;
    sourceCode: string;
    description: string;
}

interface ICreateServiceForm {
    onSubmit: SubmitHandler<ICreateServiceFormData>;
    platform: Platform;
    setPlatform: React.Dispatch<React.SetStateAction<Platform>>;
}
const CreateServiceForm = ({
    onSubmit,
    platform,
    setPlatform,
}: ICreateServiceForm) => {
    const { handleSubmit, register } = useForm<ICreateServiceFormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input placeholder="Name" {...register('name')} />
            <div className="rounded-lg bg-gray-100 w-full h-12 flex items-center justify-around overflow-hidden">
                <PlatformSelector
                    selected={platform === Platform.Aws}
                    onClick={() => setPlatform(Platform.Aws)}
                >
                    AWS
                </PlatformSelector>
                <PlatformSelector
                    selected={platform === Platform.Azure}
                    onClick={() => setPlatform(Platform.Azure)}
                >
                    Azure
                </PlatformSelector>
                <PlatformSelector
                    selected={platform === Platform.Gcp}
                    onClick={() => setPlatform(Platform.Gcp)}
                >
                    GCP
                </PlatformSelector>
                <PlatformSelector
                    selected={platform === Platform.Other}
                    onClick={() => setPlatform(Platform.Other)}
                >
                    Other
                </PlatformSelector>
            </div>
            <Input placeholder="Service URL" {...register('serviceUrl')} />
            <Input
                placeholder="Introspection URL"
                {...register('introspectionUrl')}
            />
            <Input placeholder="Summary" {...register('summary')} />
            <Input placeholder="Documentation" {...register('documentation')} />
            <Input placeholder="Source Code" {...register('sourceCode')} />
            <Textarea
                placeholder="Description"
                rows={4}
                {...register('description')}
            />
            <Button>Create Service</Button>
        </form>
    );
};
export default CreateServiceForm;
