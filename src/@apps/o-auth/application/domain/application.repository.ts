
import { CQMetadata, IRepository, ObjectLiteral, Pagination, QueryStatement } from 'aurora-ts-core';
import { OAuthApplication } from './application.aggregate';
import { ApplicationId } from './value-objects';

export abstract class IApplicationRepository implements IRepository<OAuthApplication>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<OAuthApplication>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthApplication | null>;

    // find a single record by id
    abstract findById(
        id: ApplicationId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthApplication | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<OAuthApplication[]>;

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
        application: OAuthApplication,
        options?: {
            createOptions?: ObjectLiteral;
            dataFactory?: (aggregate: OAuthApplication) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: OAuthApplication) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        applications: OAuthApplication[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: OAuthApplication) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        application: OAuthApplication,
        options?: {
            updateOptions?: ObjectLiteral;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: OAuthApplication) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: ApplicationId,
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