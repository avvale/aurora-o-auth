import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';
import { UpsertRoleCommandHandler } from './upsert-role.command-handler';
import { UpsertRoleCommand } from './upsert-role.command';
import { UpsertRoleService } from './upsert-role.service';

describe('UpsertRoleCommandHandler', () =>
{
    let commandHandler: UpsertRoleCommandHandler;
    let service: UpsertRoleService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertRoleCommandHandler,
                {
                    provide : UpsertRoleService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertRoleCommandHandler>(UpsertRoleCommandHandler);
        service         = module.get<UpsertRoleService>(UpsertRoleService);
    });

    describe('main', () =>
    {
        test('UpsertRoleCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertRoleService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertRoleCommand(
                    {
                        id: roles[0].id,
                        name: roles[0].name,
                        isMaster: roles[0].isMaster,
                        permissionIds: roles[0].permissionIds,
                        accountIds: roles[0].accountIds,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});