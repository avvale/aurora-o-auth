import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { UpdateRefreshTokenByIdCommandHandler } from './update-refresh-token-by-id.command-handler';
import { UpdateRefreshTokenByIdCommand } from './update-refresh-token-by-id.command';
import { UpdateRefreshTokenByIdService } from './update-refresh-token-by-id.service';

describe('UpdateRefreshTokenByIdCommandHandler', () =>
{
    let commandHandler: UpdateRefreshTokenByIdCommandHandler;
    let service: UpdateRefreshTokenByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRefreshTokenByIdCommandHandler,
                {
                    provide : UpdateRefreshTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateRefreshTokenByIdCommandHandler>(UpdateRefreshTokenByIdCommandHandler);
        service         = module.get<UpdateRefreshTokenByIdService>(UpdateRefreshTokenByIdService);
    });

    describe('main', () =>
    {
        test('UpdateRefreshTokenByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an refreshToken created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateRefreshTokenByIdCommand(
                    {
                        id: refreshTokens[0].id,
                        accessTokenId: refreshTokens[0].accessTokenId,
                        token: refreshTokens[0].token,
                        isRevoked: refreshTokens[0].isRevoked,
                        expiresAt: refreshTokens[0].expiresAt,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});