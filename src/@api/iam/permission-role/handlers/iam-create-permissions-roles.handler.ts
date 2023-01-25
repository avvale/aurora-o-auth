import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurora-ts/core';

// @apps
import { CreatePermissionsRolesCommand } from '@app/iam/permission-role/application/create/create-permissions-roles.command';
import { IamCreatePermissionRoleInput } from '@api/graphql';
import { IamCreatePermissionRoleDto } from '../dto';

@Injectable()
export class IamCreatePermissionsRolesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: IamCreatePermissionRoleInput[] | IamCreatePermissionRoleDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreatePermissionsRolesCommand(
            payload,
            {
                timezone,
            },
        ));
        return true;
    }
}