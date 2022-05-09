/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateAccessTokensResolver } from './o-auth-update-access-tokens.resolver';
import { OAuthUpdateAccessTokensHandler } from '../handlers/o-auth-update-access-tokens.handler';
import { OAuthUpdateAccessTokensInput } from '../../../../graphql';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthUpdateAccessTokensResolver', () =>
{
    let resolver: OAuthUpdateAccessTokensResolver;
    let handler: OAuthUpdateAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateAccessTokensResolver,
                {
                    provide : OAuthUpdateAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateAccessTokensResolver>(OAuthUpdateAccessTokensResolver);
        handler = module.get<OAuthUpdateAccessTokensHandler>(OAuthUpdateAccessTokensHandler);
    });

    test('OAuthUpdateAccessTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateAccessTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accessTokens updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(<OAuthUpdateAccessTokensInput>accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});