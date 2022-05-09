import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { UpdateAccessTokensCommandHandler } from './update-access-tokens.command-handler';
import { UpdateAccessTokensCommand } from './update-access-tokens.command';
import { UpdateAccessTokensService } from './update-access-tokens.service';

describe('UpdateAccessTokensCommandHandler', () =>
{
    let commandHandler: UpdateAccessTokensCommandHandler;
    let service: UpdateAccessTokensService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAccessTokensCommandHandler,
                {
                    provide : UpdateAccessTokensService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAccessTokensCommandHandler>(UpdateAccessTokensCommandHandler);
        service         = module.get<UpdateAccessTokensService>(UpdateAccessTokensService);
    });

    describe('main', () =>
    {
        test('UpdateAccessTokensCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an accessTokens updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAccessTokensCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});