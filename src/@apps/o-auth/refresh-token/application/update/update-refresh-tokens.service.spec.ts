/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { UpdateRefreshTokensService } from './update-refresh-tokens.service';
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
import { MockRefreshTokenRepository } from '../../infrastructure/mock/mock-refresh-token.repository';

describe('UpdateRefreshTokensService', () =>
{
    let service: UpdateRefreshTokensService;
    let repository: IRefreshTokenRepository;
    let mockRepository: MockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateRefreshTokensService,
                MockRefreshTokenRepository,
                {
                    provide : IRefreshTokenRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateRefreshTokensService);
        repository      = module.get(IRefreshTokenRepository);
        mockRepository  = module.get(MockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('UpdateRefreshTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a refreshTokens and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new RefreshTokenId(refreshTokens[0].id),
                    accessTokenId: new RefreshTokenAccessTokenId(refreshTokens[0].accessTokenId),
                    token: new RefreshTokenToken(refreshTokens[0].token),
                    isRevoked: new RefreshTokenIsRevoked(refreshTokens[0].isRevoked),
                    expiresAt: new RefreshTokenExpiresAt(refreshTokens[0].expiresAt),
                },
            )).toBe(undefined);
        });
    });
});