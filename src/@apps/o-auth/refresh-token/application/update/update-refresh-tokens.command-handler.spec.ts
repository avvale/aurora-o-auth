import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { UpdateRefreshTokensCommandHandler } from './update-refresh-tokens.command-handler';
import { UpdateRefreshTokensCommand } from './update-refresh-tokens.command';
import { UpdateRefreshTokensService } from './update-refresh-tokens.service';

describe('UpdateRefreshTokensCommandHandler', () =>
{
    let commandHandler: UpdateRefreshTokensCommandHandler;
    let service: UpdateRefreshTokensService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateRefreshTokensCommandHandler,
                {
                    provide : UpdateRefreshTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateRefreshTokensCommandHandler>(UpdateRefreshTokensCommandHandler);
        service         = module.get<UpdateRefreshTokensService>(UpdateRefreshTokensService);
    });

    describe('main', () =>
    {
        test('UpdateRefreshTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an refreshTokens updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateRefreshTokensCommand(
                    {
                        id: refreshTokens[0].id,
                        accessTokenId: refreshTokens[0].accessTokenId,
                        token: refreshTokens[0].token,
                        isRevoked: refreshTokens[0].isRevoked,
                        expiresAt: refreshTokens[0].expiresAt,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});