import { Cache } from '@urql/exchange-graphcache';
import {
    CreateResourceMutation,
    CreateResourceMutationVariables,
    Exact,
    ResourceCreateInput,
} from '../../../../../generated/graphql';
import { UpdateCacheHandler } from '../../../../../utils/update.helper';

export class CreateResourceUpdater extends UpdateCacheHandler<
    CreateResourceMutation,
    CreateResourceMutationVariables
> {
    constructor() {
        super('resourceCreate');
    }

    handler(
        _: CreateResourceMutation,
        args: Exact<{ deploymentID: string; input: ResourceCreateInput }>,
        cache: Cache,
    ): void {
        cache
            .inspectFields({
                __typename: 'Deployment',
                id: args.deploymentID,
            })
            .filter(
                (field) =>
                    field.fieldName === 'resource' ||
                    field.fieldName === 'status',
            )
            .forEach((field) =>
                cache.invalidate(
                    {
                        __typename: 'Deployment',
                        id: args.deploymentID,
                    },
                    field.fieldName,
                    field.arguments,
                ));
    }
}
