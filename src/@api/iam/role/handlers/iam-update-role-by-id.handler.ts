import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// @app
import { FindRoleByIdQuery } from '@app/iam/role/application/find/find-role-by-id.query';
import { UpdateRoleByIdCommand } from '@app/iam/role/application/update/update-role-by-id.command';
import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';
import { IamRoleDto, IamUpdateRoleByIdDto } from '../dto';

@Injectable()
export class IamUpdateRoleByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateRoleByIdInput | IamUpdateRoleByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamRole | IamRoleDto>
    {
        const role = await this.queryBus.ask(new FindRoleByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));

        const dataToUpdate = Utils.diff(payload, role);

        await this.commandBus.dispatch(new UpdateRoleByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindRoleByIdQuery(
            payload.id,
            constraint,
            { timezone },
        ));
    }
}