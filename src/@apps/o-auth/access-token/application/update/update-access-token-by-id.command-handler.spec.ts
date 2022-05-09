import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { UpdateAccessTokenByIdCommandHandler } from './update-access-token-by-id.command-handler';
import { UpdateAccessTokenByIdCommand } from './update-access-token-by-id.command';
import { UpdateAccessTokenByIdService } from './update-access-token-by-id.service';

describe('UpdateAccessTokenByIdCommandHandler', () =>
{
    let commandHandler: UpdateAccessTokenByIdCommandHandler;
    let service: UpdateAccessTokenByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAccessTokenByIdCommandHandler,
                {
                    provide : UpdateAccessTokenByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAccessTokenByIdCommandHandler>(UpdateAccessTokenByIdCommandHandler);
        service         = module.get<UpdateAccessTokenByIdService>(UpdateAccessTokenByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAccessTokenByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an accessToken created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAccessTokenByIdCommand(
                    {
                        id: accessTokens[0].id,
                        clientId: accessTokens[0].clientId,
                        accountId: accessTokens[0].accountId,
                        token: accessTokens[0].token,
                        name: accessTokens[0].name,
                        isRevoked: accessTokens[0].isRevoked,
                        expiresAt: accessTokens[0].expiresAt,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});