import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetAccountsQuery } from '@app/iam/account/application/get/get-accounts.query';
import { UpdateAccountsCommand } from '@app/iam/account/application/update/update-accounts.command';
import { IamAccount, IamUpdateAccountsInput } from '@api/graphql';
import { IamAccountDto, IamUpdateAccountsDto } from '../dto';

@Injectable()
export class IamUpdateAccountsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateAccountsInput | IamUpdateAccountsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamAccount | IamAccountDto>
    {
        await this.commandBus.dispatch(new UpdateAccountsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new GetAccountsQuery(queryStatement, constraint, { timezone }));
    }
}