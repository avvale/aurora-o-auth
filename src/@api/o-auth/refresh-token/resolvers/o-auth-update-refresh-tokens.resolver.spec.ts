/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateRefreshTokensResolver } from './o-auth-update-refresh-tokens.resolver';
import { OAuthUpdateRefreshTokensHandler } from '../handlers/o-auth-update-refresh-tokens.handler';
import { OAuthUpdateRefreshTokensInput } from '../../../../graphql';

// sources
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthUpdateRefreshTokensResolver', () =>
{
    let resolver: OAuthUpdateRefreshTokensResolver;
    let handler: OAuthUpdateRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateRefreshTokensResolver,
                {
                    provide : OAuthUpdateRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateRefreshTokensResolver>(OAuthUpdateRefreshTokensResolver);
        handler = module.get<OAuthUpdateRefreshTokensHandler>(OAuthUpdateRefreshTokensHandler);
    });

    test('OAuthUpdateRefreshTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateRefreshTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a refreshTokens updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(<OAuthUpdateRefreshTokensInput>refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});