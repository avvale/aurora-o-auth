/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { OAuthUpdateAccessTokenByIdHandler } from './o-auth-update-access-token-by-id.handler';
import { OAuthUpdateAccessTokenByIdInput } from '../../../../graphql';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthUpdateAccessTokenByIdHandler', () =>
{
    let handler: OAuthUpdateAccessTokenByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateAccessTokenByIdHandler,
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

        handler     = module.get<OAuthUpdateAccessTokenByIdHandler>(OAuthUpdateAccessTokenByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('OAuthUpdateAccessTokenByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateAccessTokenByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a accessToken updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await handler.main(<OAuthUpdateAccessTokenByIdInput>accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});