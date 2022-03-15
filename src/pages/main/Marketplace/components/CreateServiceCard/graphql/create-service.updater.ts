import { Cache } from '@urql/exchange-graphcache';
import {
    CreateDeploymentMutationVariables,
    CreateServiceMutation,
    DeploymentCreateInput,
    Exact,
} from '../../../../../../generated/graphql';
import { UpdateCacheHandler } from '../../../../../../utils/update.helper';

export class CreateServiceUpdater extends UpdateCacheHandler<
    CreateServiceMutation,
    CreateDeploymentMutationVariables
> {
    constructor() {
        super('serviceCreate');
    }

    protected handler(
        _: CreateServiceMutation,
        __: Exact<{ systemID: string; input: DeploymentCreateInput }>,
        cache: Cache,
    ): void {
        cache
            .inspectFields('Query')
            .filter((field) => field.fieldName === 'services')
            .forEach((field) =>
                cache.invalidate('Query', field.fieldName, field.arguments));
    }
}
