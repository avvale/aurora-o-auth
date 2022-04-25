
import { CQMetadata, IRepository, ObjectLiteral, Pagination, QueryStatement } from 'aurora-ts-core';
import { OAuthRefreshToken } from './refresh-token.aggregate';
import { RefreshTokenId } from './value-objects';

export abstract class IRefreshTokenRepository implements IRepository<OAuthRefreshToken>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<OAuthRefreshToken>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthRefreshToken | null>;

    // find a single record by id
    abstract findById(
        id: RefreshTokenId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthRefreshToken | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthRefreshToken[]>;

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
        refreshToken: OAuthRefreshToken,
        options?: {
            createOptions?: ObjectLiteral;
            dataFactory?: (aggregate: OAuthRefreshToken) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: OAuthRefreshToken) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        refreshTokens: OAuthRefreshToken[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: OAuthRefreshToken) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        refreshToken: OAuthRefreshToken,
        options?: {
            updateOptions?: ObjectLiteral;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: OAuthRefreshToken) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: RefreshTokenId,
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