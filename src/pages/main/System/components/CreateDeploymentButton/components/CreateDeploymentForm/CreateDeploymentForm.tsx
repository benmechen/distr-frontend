import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../../../../components/Button';
import { Input } from '../../../../../../../components/Input';
import { Platform as PlatformSelector } from './components/Platform';

enum Platform {
	AWS,
	AZURE,
	GCP,
	OTHER,
}

interface ICreateDeploymentFormData {
	name: string;
	aws_id?: string;
	aws_secret?: string;
	aws_region?: string;
	azure_tenantId?: string;
	azure_clientId?: string;
	azure_secret?: string;
}

interface ICreateDeploymentForm {
	onSubmit: SubmitHandler<ICreateDeploymentFormData>;
}
const CreateDeploymentForm = ({ onSubmit }: ICreateDeploymentForm) => {
	const [platform, setPlatform] = useState<Platform>(Platform.AWS);
	const { handleSubmit, register } = useForm<ICreateDeploymentFormData>();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Input
				placeholder="Name"
				{...register('name', { required: true })}
			/>
			<div className="rounded-lg bg-gray-100 w-full h-12 flex items-center justify-around overflow-hidden">
				<PlatformSelector
					selected={platform === Platform.AWS}
					onClick={() => setPlatform(Platform.AWS)}
				>
					AWS
				</PlatformSelector>
				<PlatformSelector
					selected={platform === Platform.AZURE}
					onClick={() => setPlatform(Platform.AZURE)}
				>
					Azure
				</PlatformSelector>
				<PlatformSelector
					selected={platform === Platform.GCP}
					onClick={() => setPlatform(Platform.GCP)}
				>
					GCP
				</PlatformSelector>
				<PlatformSelector
					selected={platform === Platform.OTHER}
					onClick={() => setPlatform(Platform.OTHER)}
				>
					Other
				</PlatformSelector>
			</div>
			{platform === Platform.AWS ? (
				<>
					<Input
						placeholder="Access Key ID"
						{...register('aws_id', { required: true })}
					/>
					<Input
						placeholder="Access Key Secret"
						type="password"
						{...register('aws_secret', { required: true })}
					/>
					<Input
						placeholder="Region (eu-west-2)"
						{...register('aws_region', { required: true })}
					/>
				</>
			) : platform === Platform.AZURE ? (
				<>
					<Input
						placeholder="Tenant ID"
						{...register('azure_tenantId', { required: true })}
					/>
					<Input
						placeholder="Client ID"
						{...register('azure_clientId', { required: true })}
					/>
					<Input
						placeholder="Secret"
						type="password"
						{...register('azure_secret', { required: true })}
					/>
				</>
			) : (
				<>
					<Input
						placeholder="Credential"
						{...register('aws_id', { required: true })}
					/>
				</>
			)}
			<Button>Create Deployment</Button>
		</form>
	);
};

export default CreateDeploymentForm;