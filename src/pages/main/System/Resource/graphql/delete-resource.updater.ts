import { Cache } from '@urql/exchange-graphcache';
import {
    DeleteResourceMutation,
    DeleteResourceMutationVariables,
    Exact,
} from '../../../../../generated/graphql';
import { UpdateCacheHandler } from '../../../../../utils/update.helper';

export class DeleteResourceUpdater extends UpdateCacheHandler<
    DeleteResourceMutation,
    DeleteResourceMutationVariables
> {
    constructor() {
        super('resourceDelete');
    }

    protected handler(
        _: DeleteResourceMutation,
        args: Exact<{ id: string }>,
        cache: Cache,
    ): void {
        cache.invalidate({
            __typename: 'Resource',
            id: args.id,
        });
    }
}
