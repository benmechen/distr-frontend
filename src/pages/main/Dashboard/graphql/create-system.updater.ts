import { Cache } from '@urql/exchange-graphcache';
import {
    CreateSystemMutation,
    CreateSystemMutationVariables,
    Exact,
    GetSystemsDocument,
    GetSystemsQuery,
    GetSystemsQueryVariables,
    SystemCreateInput,
} from '../../../../generated/graphql';
import { UpdateCacheHandler } from '../../../../utils/update.helper';

export class CreateSystemUpdater extends UpdateCacheHandler<
    CreateSystemMutation,
    CreateSystemMutationVariables
> {
    constructor() {
        super('systemCreate');
    }

    protected handler(
        parent: CreateSystemMutation,
        _: Exact<{ input: SystemCreateInput }>,
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
                    (data) => {
                        data?.systems.edges?.push({
                            node: parent.systemCreate,
                        });
                        return data;
                    },
                ));
    }
}
