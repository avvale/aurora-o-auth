/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateAccessTokensController } from './o-auth-update-access-tokens.controller';
import { OAuthUpdateAccessTokensHandler } from '../handlers/o-auth-update-access-tokens.handler';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthUpdateAccessTokensController', () =>
{
    let controller: OAuthUpdateAccessTokensController;
    let handler: OAuthUpdateAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateAccessTokensController,
            ],
            providers: [
                {
                    provide : OAuthUpdateAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateAccessTokensController>(OAuthUpdateAccessTokensController);
        handler = module.get<OAuthUpdateAccessTokensHandler>(OAuthUpdateAccessTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateAccessTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accessTokens updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main(accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});