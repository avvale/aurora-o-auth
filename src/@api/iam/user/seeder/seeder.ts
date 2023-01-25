import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurora-ts/core';
import { CreateUsersCommand } from '@app/iam/user/application/create/create-users.command';
import { SeederModule } from './seeder.module';
import { users } from '@app/iam/user/infrastructure/seeds/user.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateUsersCommand(users, { timezone: process.env.TZ }));
            appContext.close();
        });
    }
}
new Seeder().main();