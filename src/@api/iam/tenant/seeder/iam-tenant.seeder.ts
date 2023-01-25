import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreateTenantsCommand } from '@app/iam/tenant/application/create/create-tenants.command';
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';

@Injectable()
export class IamTenantSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(
            tenants,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}