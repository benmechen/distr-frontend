import { Cache } from '@urql/exchange-graphcache';
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
        _: DeleteDeploymentMutation,
        args: Exact<{ id: string }>,
        cache: Cache,
    ): void {
        cache.invalidate({
            __typename: 'Deployment',
            id: args.id,
        });
    }
}
