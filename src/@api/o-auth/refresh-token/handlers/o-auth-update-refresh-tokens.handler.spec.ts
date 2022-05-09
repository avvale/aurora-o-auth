/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthUpdateRefreshTokensHandler } from './o-auth-update-refresh-tokens.handler';
import { OAuthUpdateRefreshTokensInput } from '../../../../graphql';

// sources
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthUpdateRefreshTokensHandler', () =>
{
    let handler: OAuthUpdateRefreshTokensHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateRefreshTokensHandler,
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

        handler     = module.get<OAuthUpdateRefreshTokensHandler>(OAuthUpdateRefreshTokensHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateRefreshTokensHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateRefreshTokensHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a refreshTokens updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await handler.main(<OAuthUpdateRefreshTokensInput>refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});