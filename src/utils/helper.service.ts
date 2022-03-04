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
	Object.entries(data).map(([key, value]) => ({
		name: key,
		value: {
			boolValue: typeof value === 'boolean' ? value : undefined,
			stringValue: typeof value === 'string' ? value : undefined,
			numberValue: typeof value === 'number' ? value : undefined,
			structValue:
				typeof value === 'object'
					? {
							fields: value,
					  }
					: undefined,
		},
	}));
