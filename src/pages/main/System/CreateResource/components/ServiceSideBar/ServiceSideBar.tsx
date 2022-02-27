import { Platform } from '../../../components/Deployment/components/DeploymentForm/DeploymentForm';
import { VerifiedBadge } from './components/VerifiedBadge';

interface IServiceSideBar {
	id: string;
	children?: React.ReactNode;
}
const ServiceSideBar = ({ id, children }: IServiceSideBar) => {
	const service = {
		name: 'S3',
		verified: true,
		description:
			'Object storage built to retrieve any amount of data from anywhere. Amazon Simple Storage Service (Amazon S3) is an object storage service offering industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can store and protect any amount of data for virtually any use case, such as data lakes, cloud-native applications, and mobile apps. With cost-effective storage classes and easy-to-use management features, you can optimise costs, organise data, and configure fine-tuned access controls to meet specific business, organisational, and compliance requirements.',
		platform: Platform.AWS,
		author: {
			id: '123',
			name: 'Chelsea Apps',
		},
		source: 'https://github.com/',
		documentation: 'https://docs.aws.amazon.com/AmazonS3/',
	};
	return (
		<div className="w-full md:w-1/3 bg-white shadow-lg h-screen p-4 pt-20">
			<h2 className="font-bold text-2xl">{service.name}</h2>
			{service.verified && <VerifiedBadge />}
			<p className="my-6 font-light leading-6">{service.description}</p>
			<hr />
			<p className="mt-6 font-light">
				<span className="font-semibold">Platform:</span>
				<span className="ml-2 underline">{service.platform}</span>
			</p>
			<p className="font-light">
				<span className="font-semibold">Author:</span>
				<span className="ml-2 underline">{service.author.name}</span>
			</p>
			<p className="font-light">
				<span className="font-semibold">Source Code:</span>
				<span className="ml-2 underline">{service.source}</span>
			</p>
			<p className="font-light">
				<span className="font-semibold">Docs:</span>
				<span className="ml-2 underline">{service.documentation}</span>
			</p>
			{children}
		</div>
	);
};
export default ServiceSideBar;
