/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateAccessTokenByIdController } from './o-auth-update-access-token-by-id.controller';
import { OAuthUpdateAccessTokenByIdHandler } from '../handlers/o-auth-update-access-token-by-id.handler';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthUpdateAccessTokenByIdController', () =>
{
    let controller: OAuthUpdateAccessTokenByIdController;
    let handler: OAuthUpdateAccessTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateAccessTokenByIdController,
            ],
            providers: [
                {
                    provide : OAuthUpdateAccessTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateAccessTokenByIdController>(OAuthUpdateAccessTokenByIdController);
        handler = module.get<OAuthUpdateAccessTokenByIdHandler>(OAuthUpdateAccessTokenByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateAccessTokenByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accessToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main(accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});