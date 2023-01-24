import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindPermissionByIdQuery } from '@app/iam/permission/application/find/find-permission-by-id.query';
import { UpsertPermissionCommand } from '@app/iam/permission/application/upsert/upsert-permission.command';
import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '../dto';

@Injectable()
export class IamUpsertPermissionHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdatePermissionByIdInput | IamUpdatePermissionByIdDto,
        timezone?: string,
    ): Promise<IamPermission | IamPermissionDto>
    {
        await this.commandBus.dispatch(new UpsertPermissionCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id, {}, { timezone }));
    }
}