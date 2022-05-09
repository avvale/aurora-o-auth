/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateRefreshTokenByIdController } from './o-auth-update-refresh-token-by-id.controller';
import { OAuthUpdateRefreshTokenByIdHandler } from '../handlers/o-auth-update-refresh-token-by-id.handler';

// sources
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthUpdateRefreshTokenByIdController', () =>
{
    let controller: OAuthUpdateRefreshTokenByIdController;
    let handler: OAuthUpdateRefreshTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateRefreshTokenByIdController,
            ],
            providers: [
                {
                    provide : OAuthUpdateRefreshTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateRefreshTokenByIdController>(OAuthUpdateRefreshTokenByIdController);
        handler = module.get<OAuthUpdateRefreshTokenByIdHandler>(OAuthUpdateRefreshTokenByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateRefreshTokenByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a refreshToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main(refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});