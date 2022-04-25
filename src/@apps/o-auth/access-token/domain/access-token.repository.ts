
import { CQMetadata, IRepository, ObjectLiteral, Pagination, QueryStatement } from 'aurora-ts-core';
import { OAuthAccessToken } from './access-token.aggregate';
import { AccessTokenId } from './value-objects';

export abstract class IAccessTokenRepository implements IRepository<OAuthAccessToken>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<OAuthAccessToken>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthAccessToken | null>;

    // find a single record by id
    abstract findById(
        id: AccessTokenId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthAccessToken | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthAccessToken[]>;

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
        accessToken: OAuthAccessToken,
        options?: {
            createOptions?: ObjectLiteral;
            dataFactory?: (aggregate: OAuthAccessToken) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: OAuthAccessToken) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        accessTokens: OAuthAccessToken[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: OAuthAccessToken) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        accessToken: OAuthAccessToken,
        options?: {
            updateOptions?: ObjectLiteral;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: OAuthAccessToken) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AccessTokenId,
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