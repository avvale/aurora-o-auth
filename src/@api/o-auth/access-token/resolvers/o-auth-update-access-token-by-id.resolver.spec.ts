/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateAccessTokenByIdResolver } from './o-auth-update-access-token-by-id.resolver';
import { OAuthUpdateAccessTokenByIdHandler } from '../handlers/o-auth-update-access-token-by-id.handler';
import { OAuthUpdateAccessTokenByIdInput } from '../../../../graphql';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthUpdateAccessTokenByIdResolver', () =>
{
    let resolver: OAuthUpdateAccessTokenByIdResolver;
    let handler: OAuthUpdateAccessTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateAccessTokenByIdResolver,
                {
                    provide : OAuthUpdateAccessTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateAccessTokenByIdResolver>(OAuthUpdateAccessTokenByIdResolver);
        handler = module.get<OAuthUpdateAccessTokenByIdHandler>(OAuthUpdateAccessTokenByIdHandler);
    });

    test('OAuthUpdateAccessTokenByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateAccessTokenByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accessToken by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(<OAuthUpdateAccessTokenByIdInput>accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});