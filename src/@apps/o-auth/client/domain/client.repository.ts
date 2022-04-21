
import { CQMetadata, IRepository, ObjectLiteral, Pagination, QueryStatement } from 'aurora-ts-core';
import { OAuthClient } from './client.aggregate';
import { ClientId } from './value-objects';

export abstract class IClientRepository implements IRepository<OAuthClient>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<OAuthClient>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthClient | null>;

    // find a single record by id
    abstract findById(
        id: ClientId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthClient | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthClient[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // ******************
    // ** side effects **
    // ******************

    // create a single record
    abstract create(
        client: OAuthClient,
        options?: {
            createOptions?: ObjectLiteral;
            dataFactory?: (aggregate: OAuthClient) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: OAuthClient) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        clients: OAuthClient[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: OAuthClient) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        client: OAuthClient,
        options?: {
            updateOptions?: ObjectLiteral;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: OAuthClient) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: ClientId,
        options?: {
            deleteOptions?: ObjectLiteral;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            deleteOptions?: ObjectLiteral;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}