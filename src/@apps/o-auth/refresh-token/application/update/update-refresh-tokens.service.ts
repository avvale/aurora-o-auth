import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from '../../domain/value-objects';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';
import { AddRefreshTokensContextEvent } from '../events/add-refresh-tokens-context.event';

@Injectable()
export class UpdateRefreshTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository,
    ) {}

    async main(
        payload: {
            id?: RefreshTokenId;
            accessTokenId?: RefreshTokenAccessTokenId;
            token?: RefreshTokenToken;
            isRevoked?: RefreshTokenIsRevoked;
            expiresAt?: RefreshTokenExpiresAt;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const refreshToken = OAuthRefreshToken.register(
            payload.id,
            payload.accessTokenId,
            payload.token,
            payload.isRevoked,
            payload.expiresAt,
            null, // createdAt
            new RefreshTokenUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(refreshToken, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const refreshTokens = await this.repository.get({ queryStatement, constraint, cQMetadata });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const refreshTokensRegister = this.publisher.mergeObjectContext(
            new AddRefreshTokensContextEvent(refreshTokens),
        );

        refreshTokensRegister.updated(); // apply event to model events
        refreshTokensRegister.commit(); // commit all events of model
    }
}