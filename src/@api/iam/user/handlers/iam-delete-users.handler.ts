import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetUsersQuery } from '@app/iam/user/application/get/get-users.query';
import { DeleteUsersCommand } from '@app/iam/user/application/delete/delete-users.command';
import { IamUser } from '@api/graphql';
import { IamUserDto } from '../dto';

@Injectable()
export class IamDeleteUsersHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamUser[] | IamUserDto[]>
    {
        const users = await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteUsersCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return users;
    }
}