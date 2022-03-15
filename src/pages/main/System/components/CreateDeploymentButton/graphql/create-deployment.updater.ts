import { Cache } from '@urql/exchange-graphcache';
import {
    CreateDeploymentMutation,
    CreateDeploymentMutationVariables,
    DeploymentCreateInput,
    Exact,
    GetDeploymentsForSystemDocument,
    GetDeploymentsForSystemQuery,
    GetDeploymentsForSystemQueryVariables,
} from '../../../../../../generated/graphql';
import { UpdateCacheHandler } from '../../../../../../utils/update.helper';

export class CreateDeploymentUpdater extends UpdateCacheHandler<
    CreateDeploymentMutation,
    CreateDeploymentMutationVariables
> {
    constructor() {
        super('deploymentCreate');
    }

    protected handler(
        parent: CreateDeploymentMutation,
        args: Exact<{ systemID: string; input: DeploymentCreateInput }>,
        cache: Cache,
    ): void {
        cache
            .inspectFields('Query')
            .filter(
                (field) =>
                    field.fieldName === 'system' &&
                    field.arguments?.id?.toString() === args.systemID,
            )
            .forEach((field) => {
                cache.updateQuery<
                    GetDeploymentsForSystemQuery,
                    GetDeploymentsForSystemQueryVariables
                >(
                    {
                        query: GetDeploymentsForSystemDocument,
                        variables:
                            field.arguments as GetDeploymentsForSystemQueryVariables,
                    },
                    (data) => {
                        data?.system.deployments.push(parent.deploymentCreate);
                        return data;
                    },
                );
            });
    }
}
