import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurora-ts/core';
import { CreateApplicationsCommand } from '@app/o-auth/application/application/create/create-applications.command';
import { SeederModule } from './seeder.module';
import { applications } from '@app/o-auth/application/infrastructure/seeds/application.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateApplicationsCommand(applications, { timezone: process.env.TZ }));
            appContext.close();
        });
    }
}
new Seeder().main();