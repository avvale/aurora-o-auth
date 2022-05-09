/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { UpdateRefreshTokenByIdService } from './update-refresh-token-by-id.service';
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

describe('UpdateRefreshTokenByIdService', () =>
{
    let service: UpdateRefreshTokenByIdService;
    let repository: IRefreshTokenRepository;
    let mockRepository: MockRefreshTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateRefreshTokenByIdService,
                MockRefreshTokenRepository,
                {
                    provide : IRefreshTokenRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateRefreshTokenByIdService);
        repository      = module.get(IRefreshTokenRepository);
        mockRepository  = module.get(MockRefreshTokenRepository);
    });

    describe('main', () =>
    {
        test('UpdateRefreshTokenByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a refreshToken and emit event', async () =>
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