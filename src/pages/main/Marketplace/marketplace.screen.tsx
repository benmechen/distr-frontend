import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Marketplace } from '../../../components/Marketplace';
import { ServiceRowFragment } from '../../../generated/graphql';
import { Layout } from '../Layout';
import { ServiceSideBar } from '../System/CreateResource/components/ServiceSideBar';

const MarketplaceScreen = () => {
	const navigate = useNavigate();
	const [selectedService, setSelectedService] =
		useState<ServiceRowFragment>();

	return (
		<Layout
			onBack={() => navigate(-1)}
			title={{
				main: 'Marketplace',
			}}
		>
			<div className="flex justify-end">
				<div className="w-full p-4 flex flex-col items-start max-h-full">
					<div className="w-3/4 max-h-full">
						<Marketplace
							selectedService={selectedService}
							setSelectedService={setSelectedService}
							showCreate
						/>
					</div>
				</div>
				{selectedService ? (
					<ServiceSideBar id={selectedService.id} />
				) : (
					<div className="w-full md:w-1/3"></div>
				)}
			</div>
		</Layout>
	);
};
export default MarketplaceScreen;
