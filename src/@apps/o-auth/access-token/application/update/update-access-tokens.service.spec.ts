/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { UpdateAccessTokensService } from './update-access-tokens.service';
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
import { MockAccessTokenRepository } from '../../infrastructure/mock/mock-access-token.repository';

describe('UpdateAccessTokensService', () =>
{
    let service: UpdateAccessTokensService;
    let repository: IAccessTokenRepository;
    let mockRepository: MockAccessTokenRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateAccessTokensService,
                MockAccessTokenRepository,
                {
                    provide : IAccessTokenRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(UpdateAccessTokensService);
        repository      = module.get(IAccessTokenRepository);
        mockRepository  = module.get(MockAccessTokenRepository);
    });

    describe('main', () =>
    {
        test('UpdateAccessTokensService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a accessTokens and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new AccessTokenId(accessTokens[0].id),
                    clientId: new AccessTokenClientId(accessTokens[0].clientId),
                    accountId: new AccessTokenAccountId(accessTokens[0].accountId),
                    token: new AccessTokenToken(accessTokens[0].token),
                    name: new AccessTokenName(accessTokens[0].name),
                    isRevoked: new AccessTokenIsRevoked(accessTokens[0].isRevoked),
                    expiresAt: new AccessTokenExpiresAt(accessTokens[0].expiresAt),
                },
            )).toBe(undefined);
        });
    });
});