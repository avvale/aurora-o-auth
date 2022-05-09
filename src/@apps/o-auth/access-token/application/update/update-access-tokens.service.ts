import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt,
} from '../../domain/value-objects';
import { IAccessTokenRepository } from '../../domain/access-token.repository';
import { OAuthAccessToken } from '../../domain/access-token.aggregate';
import { AddAccessTokensContextEvent } from '../events/add-access-tokens-context.event';

@Injectable()
export class UpdateAccessTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository,
    ) {}

    async main(
        payload: {
            id?: AccessTokenId;
            clientId?: AccessTokenClientId;
            accountId?: AccessTokenAccountId;
            token?: AccessTokenToken;
            name?: AccessTokenName;
            isRevoked?: AccessTokenIsRevoked;
            expiresAt?: AccessTokenExpiresAt;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const accessToken = OAuthAccessToken.register(
            payload.id,
            payload.clientId,
            payload.accountId,
            payload.token,
            payload.name,
            payload.isRevoked,
            payload.expiresAt,
            null, // createdAt
            new AccessTokenUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(accessToken, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const accessTokens = await this.repository.get({ queryStatement, constraint, cQMetadata });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accessTokensRegister = this.publisher.mergeObjectContext(
            new AddAccessTokensContextEvent(accessTokens),
        );

        accessTokensRegister.updated(); // apply event to model events
        accessTokensRegister.commit(); // commit all events of model
    }
}