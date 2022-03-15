import { Cache } from '@urql/exchange-graphcache';
import {
    DeleteSystemMutation,
    DeleteSystemMutationVariables,
    Exact,
    GetSystemsDocument,
    GetSystemsQuery,
    GetSystemsQueryVariables,
} from '../../../../../../generated/graphql';
import { UpdateCacheHandler } from '../../../../../../utils/update.helper';

export class DeleteSystemUpdater extends UpdateCacheHandler<
    DeleteSystemMutation,
    DeleteSystemMutationVariables
> {
    constructor() {
        super('systemDelete');
    }

    protected handler(
        parent: DeleteSystemMutation,
        _: Exact<{ id: string }>,
        cache: Cache,
    ): void {
        cache
            .inspectFields('Query')
            .filter((field) => field.fieldName === 'systems')
            .forEach((field) =>
                cache.updateQuery<GetSystemsQuery, GetSystemsQueryVariables>(
                    {
                        query: GetSystemsDocument,
                        variables: field.arguments as GetSystemsQueryVariables,
                    },
                    (data) => ({
                        ...data,
                        systems: {
                            ...data?.systems,
                            edges: data?.systems.edges?.filter(
                                (edge) =>
                                    edge.node.id !== parent.systemDelete.id,
                            ),
                        },
                    }),
                ));
    }
}
