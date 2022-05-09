/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthUpdateRefreshTokenByIdHandler } from './o-auth-update-refresh-token-by-id.handler';
import { OAuthUpdateRefreshTokenByIdInput } from '../../../../graphql';

// sources
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthUpdateRefreshTokenByIdHandler', () =>
{
    let handler: OAuthUpdateRefreshTokenByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateRefreshTokenByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler     = module.get<OAuthUpdateRefreshTokenByIdHandler>(OAuthUpdateRefreshTokenByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateRefreshTokenByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateRefreshTokenByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a refreshToken updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await handler.main(<OAuthUpdateRefreshTokenByIdInput>refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});