import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	SingleDeploymentFragment,
	Status,
	useGetDeploymentsForSystemQuery,
} from '../../../generated/graphql';
import { toTitleCase } from '../../../utils/helper.service';
import { Layout } from '../Layout';
import { CreateDeploymentButton } from './components/CreateDeploymentButton';
import { Deployment } from './components/Deployment';

const SystemScreen = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [deployments, setDeployments] =
		useState<SingleDeploymentFragment[]>();

	const [{ data }] = useGetDeploymentsForSystemQuery({
		variables: {
			id: id ?? '',
		},
	});

	useEffect(() => {
		if (!data?.system.deployments) return;

		setDeployments(data.system.deployments);
	}, [data]);

	return (
		<Layout
			title={{
				main: data?.system.name ? toTitleCase(data?.system.name) : '',
				emphasis: 'Deployments',
			}}
			onBack={() => navigate('/')}
		>
			<div className="w-screen h-screen p-14 pb-44 pt-28 flex items-center justify-center gap-14">
				<CreateDeploymentButton systemID={id!} />
				{deployments?.map((deployment) => (
					<Deployment key={deployment.id} {...deployment} />
				))}
			</div>
		</Layout>
	);
};
export default SystemScreen;
