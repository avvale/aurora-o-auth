/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateRefreshTokensController } from './o-auth-update-refresh-tokens.controller';
import { OAuthUpdateRefreshTokensHandler } from '../handlers/o-auth-update-refresh-tokens.handler';

// sources
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthUpdateRefreshTokensController', () =>
{
    let controller: OAuthUpdateRefreshTokensController;
    let handler: OAuthUpdateRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateRefreshTokensController,
            ],
            providers: [
                {
                    provide : OAuthUpdateRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateRefreshTokensController>(OAuthUpdateRefreshTokensController);
        handler = module.get<OAuthUpdateRefreshTokensHandler>(OAuthUpdateRefreshTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateRefreshTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a refreshTokens updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main(refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});