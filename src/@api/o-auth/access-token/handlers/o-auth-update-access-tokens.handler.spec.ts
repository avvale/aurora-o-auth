/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthUpdateAccessTokensHandler } from './o-auth-update-access-tokens.handler';
import { OAuthUpdateAccessTokensInput } from '../../../../graphql';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthUpdateAccessTokensHandler', () =>
{
    let handler: OAuthUpdateAccessTokensHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateAccessTokensHandler,
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

        handler     = module.get<OAuthUpdateAccessTokensHandler>(OAuthUpdateAccessTokensHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateAccessTokensHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateAccessTokensHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a accessTokens updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await handler.main(<OAuthUpdateAccessTokensInput>accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});