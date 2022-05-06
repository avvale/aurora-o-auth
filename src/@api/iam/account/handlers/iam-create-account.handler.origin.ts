import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '../../../../@apps/iam/account/application/create/create-account.command';
import { IamAccount, IamCreateAccountInput } from '../../../../graphql';
import { IamAccountDto, IamCreateAccountDto } from '../dto';

@Injectable()
export class IamCreateAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreateAccountInput | IamCreateAccountDto,
        timezone?: string,
    ): Promise<IamAccount | IamAccountDto>
    {
        await this.commandBus.dispatch(new CreateAccountCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, {}, { timezone }));
    }
}