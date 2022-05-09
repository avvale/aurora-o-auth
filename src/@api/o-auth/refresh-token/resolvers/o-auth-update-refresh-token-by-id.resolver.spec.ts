/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateRefreshTokenByIdResolver } from './o-auth-update-refresh-token-by-id.resolver';
import { OAuthUpdateRefreshTokenByIdHandler } from '../handlers/o-auth-update-refresh-token-by-id.handler';
import { OAuthUpdateRefreshTokenByIdInput } from '../../../../graphql';

// sources
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthUpdateRefreshTokenByIdResolver', () =>
{
    let resolver: OAuthUpdateRefreshTokenByIdResolver;
    let handler: OAuthUpdateRefreshTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateRefreshTokenByIdResolver,
                {
                    provide : OAuthUpdateRefreshTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateRefreshTokenByIdResolver>(OAuthUpdateRefreshTokenByIdResolver);
        handler = module.get<OAuthUpdateRefreshTokenByIdHandler>(OAuthUpdateRefreshTokenByIdHandler);
    });

    test('OAuthUpdateRefreshTokenByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateRefreshTokenByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a refreshToken by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(<OAuthUpdateRefreshTokenByIdInput>refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});