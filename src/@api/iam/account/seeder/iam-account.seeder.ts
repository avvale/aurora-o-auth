import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreateAccountsCommand } from '@app/iam/account/application/create/create-accounts.command';
import { accounts } from '@app/iam/account/infrastructure/seeds/account.seed';

@Injectable()
export class IamAccountSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAccountsCommand(
            accounts,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}