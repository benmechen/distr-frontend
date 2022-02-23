export type IUsage =
	| { type: 'unlimited' }
	| {
			type: 'limited';
			current: number;
			limit: number;
	  };

const Usage = (props: IUsage) => {
	if (props.type === 'unlimited')
		return <span className="w-2/5 font-thin">Unlimited</span>;

	const usage = (props.current / props.limit) * 100;

	return (
		<div className="border border-gray-900 rounded w-2/5 h-6 overflow-hidden">
			<div
				className="h-6 bg-gray-900"
				style={{
					width: `${usage}%`,
				}}
			></div>
		</div>
	);
};
export default Usage;
