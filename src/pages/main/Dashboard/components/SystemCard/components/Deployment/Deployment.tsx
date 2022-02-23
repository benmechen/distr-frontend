interface IDeployment {
	name: string;
	index: number;
}

const Deployment = ({ name, index }: IDeployment) => {
	const gradients = [
		'from-cyan-500 to-blue-500',
		'from-blue-500 to-indigo-500',
		'from-indigo-500 to-purple-500',
		'from-purple-500 to-pink-500',
	];

	const gradient = gradients[index % gradients.length];

	return (
		<div
			className={`px-5 py-3 rounded bg-gradient-to-r ${gradient} flex items-center justify-center`}
		>
			<span className="text-white font-black text-3xl">
				{name.trim()[0].toUpperCase()}
			</span>
		</div>
	);
};

export default Deployment;
