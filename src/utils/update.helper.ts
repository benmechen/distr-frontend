import {
	Cache,
	ResolveInfo,
	DataFields,
	Variables,
	UpdateResolver,
	FieldInfo,
	Data,
} from '@urql/exchange-graphcache';
import { TypedDocumentNode } from 'urql';

export class UpdateCacheHandler<M = DataFields, V = Variables> {
	/**
	 * Mutation name
	 */
	public name: string;

	private cache: Cache | undefined;

	/**
	 * Create a handler to update the cache after a mutation
	 * @param mutation Mutation name
	 */
	constructor(mutation: string) {
		this.name = mutation;
	}

	/**
	 * Get the Handler's UpdateResolver
	 * @returns UpdateResolver
	 */
	build(): UpdateResolver {
		return this.handler as unknown as UpdateResolver;
	}

	/**
	 * Resolver called after mutation. Update the cache here.
	 * @param parent Mutation response
	 * @param args Mutation arguments
	 * @param cache Current cache state
	 * @param info Mutation info
	 */
	// eslint-disable-next-line
	protected handler(parent: M, args: V, cache: Cache, info: ResolveInfo) {}

	/**
	 * Find all queries with a given name in the cache
	 * @deprecated
	 * @param name Query name
	 * @param cache Cache to query
	 * @param update Update object for each
	 */
	protected findQueries(name: string, update: (field: FieldInfo) => any) {
		if (!this.cache) throw new Error('Cache not set');

		this.cache
			.inspectFields('Query')
			.filter((field) => field.fieldName === name)
			.forEach(update);
	}

	/**
	 * Update a query in the cache
	 * @deprecated
	 * @param query Query document to update
	 * @param variables Query variables
	 * @param updater Update function
	 */
	protected updateQuery<T = Data, V = Variables>(
		query: TypedDocumentNode<T, V>,
		variables: V,
		updater: (data: T | null) => T | null,
	) {
		if (!this.cache) throw new Error('Cache not set');

		this.cache.updateQuery<T, V>(
			{
				query,
				variables,
			},
			updater,
		);
	}
}
