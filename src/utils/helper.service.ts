import { Input } from '../generated/graphql';

export const toTitleCase = (value: string) =>
	value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

/**
 * Extract nodes from a list of connection edges
 * @param edges List of edges containing nodes
 * @returns List of nodes of given type
 */
export const getNodesFromEdges = <T>(edges?: { node: T }[] | null): T[] =>
	(edges ?? []).map((edge) => edge.node);

/**
 * Transform an object into a series of input values
 * @param data Data object
 * @returns Inputs
 */
export const transformInputs = (data: Record<string, any>): Input[] =>
	Object.entries(data).map(([key, value]) => {
		let boolValue: boolean | undefined = undefined;
		let stringValue: string | undefined = undefined;
		let numberValue: number | undefined = undefined;
		let structValue: { fields: any } | undefined = undefined;

		if (typeof value === 'boolean') boolValue = value;
		else if (!Number.isNaN(value) && !Number.isNaN(parseFloat(value)))
			numberValue = Number(value);
		else if (typeof value === 'object') structValue = { fields: value };
		else if (typeof value === 'string' && value.trim().length > 0)
			stringValue = value;

		return {
			name: key,
			value: {
				boolValue,
				stringValue,
				numberValue,
				structValue,
			},
		};
	});

export const splitCamelCase = (name: string) =>
	name.replace(/([a-z])([A-Z])/g, '$1 $2');

export const diff = <
	F extends Record<string, any>,
	T extends Record<string, any>,
>(
	from: F,
	to: T,
) => {
	const diff: Partial<F & T> = {};

	Object.entries(from).map(([key, value]) => {
		if (to[key] !== value) diff[key as keyof Partial<F & T>] = value;
	});

	return diff;
};
