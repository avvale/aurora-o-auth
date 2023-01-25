import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindAccountByIdQuery } from '@app/iam/account/application/find/find-account-by-id.query';
import { UpsertAccountCommand } from '@app/iam/account/application/upsert/upsert-account.command';
import { IamAccount, IamUpdateAccountByIdInput } from '@api/graphql';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';

@Injectable()
export class IamUpsertAccountHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateAccountByIdInput | IamUpdateAccountByIdDto,
        timezone?: string,
    ): Promise<IamAccount | IamAccountDto>
    {
        await this.commandBus.dispatch(new UpsertAccountCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindAccountByIdQuery(
            payload.id,
            {},
            { timezone },
        ));
    }
}