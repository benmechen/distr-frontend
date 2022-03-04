import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TertiaryButton } from '../../../../../../../components/Button';
import { Input } from '../../../../../../../components/Input';
import { Platform as PlatformSelector } from '../../../../../../../components/Platform';
import { Platform } from '../../../../../../../generated/graphql';
export interface IDeploymentFormData {
	name: string;
	aws_id?: string;
	aws_secret?: string;
	aws_region?: string;
	azure_tenantId?: string;
	azure_clientId?: string;
	azure_secret?: string;
}

interface IDeploymentForm {
	type: 'create' | 'update';
	name?: string;
	onSubmit: SubmitHandler<IDeploymentFormData>;
	onDeleteClick?: () => void;
}
const DeploymentForm = ({
	type,
	name,
	onSubmit,
	onDeleteClick,
}: IDeploymentForm) => {
	const [platform, setPlatform] = useState<Platform>(Platform.Aws);
	const { handleSubmit, register } = useForm<IDeploymentFormData>({
		defaultValues: {
			name,
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Input
				placeholder="Name"
				{...register('name', { required: true })}
			/>
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
			{platform === Platform.Aws ? (
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
			) : platform === Platform.Azure ? (
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
			{type === 'create' ? (
				<Button type="submit">Create Deployment</Button>
			) : (
				<Button type="submit">Save Changes</Button>
			)}
			{onDeleteClick && (
				<TertiaryButton className="mt-2" onClick={onDeleteClick}>
					Delete Deployment
				</TertiaryButton>
			)}
		</form>
	);
};

export default DeploymentForm;
