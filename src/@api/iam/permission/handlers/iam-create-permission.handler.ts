import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindPermissionByIdQuery } from '@app/iam/permission/application/find/find-permission-by-id.query';
import { CreatePermissionCommand } from '@app/iam/permission/application/create/create-permission.command';
import { IamPermission, IamCreatePermissionInput } from '@api/graphql';
import { IamPermissionDto, IamCreatePermissionDto } from '../dto';

@Injectable()
export class IamCreatePermissionHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreatePermissionInput | IamCreatePermissionDto,
        timezone?: string,
    ): Promise<IamPermission | IamPermissionDto>
    {
        await this.commandBus.dispatch(new CreatePermissionCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id, {}, { timezone }));
    }
}