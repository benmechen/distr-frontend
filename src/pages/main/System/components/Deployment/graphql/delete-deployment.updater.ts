import { Cache, ResolveInfo } from '@urql/exchange-graphcache';
import {
	DeleteDeploymentMutation,
	DeleteDeploymentMutationVariables,
	Exact,
} from '../../../../../../generated/graphql';
import { UpdateCacheHandler } from '../../../../../../utils/update.helper';

export class DeleteDeploymentUpdater extends UpdateCacheHandler<
	DeleteDeploymentMutation,
	DeleteDeploymentMutationVariables
> {
	constructor() {
		super('deploymentDelete');
	}

	protected handler(
		parent: DeleteDeploymentMutation,
		args: Exact<{ id: string }>,
		cache: Cache,
		info: ResolveInfo,
	): void {
		cache.invalidate({
			__typename: 'Deployment',
			id: args.id,
		});
	}
}
