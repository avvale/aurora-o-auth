import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { accounts } from '@app/iam/account/infrastructure/seeds/account.seed';
import { UpsertAccountCommandHandler } from './upsert-account.command-handler';
import { UpsertAccountCommand } from './upsert-account.command';
import { UpsertAccountService } from './upsert-account.service';

describe('UpsertAccountCommandHandler', () =>
{
    let commandHandler: UpsertAccountCommandHandler;
    let service: UpsertAccountService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertAccountCommandHandler,
                {
                    provide : UpsertAccountService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertAccountCommandHandler>(UpsertAccountCommandHandler);
        service         = module.get<UpsertAccountService>(UpsertAccountService);
    });

    describe('main', () =>
    {
        test('UpsertAccountCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertAccountService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertAccountCommand(
                    {
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});