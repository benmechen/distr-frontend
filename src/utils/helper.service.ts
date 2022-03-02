export const toTitleCase = (value: string) =>
	value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

/**
 * Extract nodes from a list of connection edges
 * @param edges List of edges containing nodes
 * @returns List of nodes of given type
 */
export const getNodesFromEdges = <T>(edges?: { node: T }[] | null): T[] =>
	(edges ?? []).map((edge) => edge.node);
