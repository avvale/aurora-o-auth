import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindTenantByIdQuery } from '@app/iam/tenant/application/find/find-tenant-by-id.query';
import { UpsertTenantCommand } from '@app/iam/tenant/application/upsert/upsert-tenant.command';
import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';

@Injectable()
export class IamUpsertTenantHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateTenantByIdInput | IamUpdateTenantByIdDto,
        timezone?: string,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new UpsertTenantCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, {}, { timezone }));
    }
}