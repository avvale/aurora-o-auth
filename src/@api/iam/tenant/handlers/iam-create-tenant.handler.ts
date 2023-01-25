import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindTenantByIdQuery } from '@app/iam/tenant/application/find/find-tenant-by-id.query';
import { CreateTenantCommand } from '@app/iam/tenant/application/create/create-tenant.command';
import { IamTenant, IamCreateTenantInput } from '@api/graphql';
import { IamTenantDto, IamCreateTenantDto } from '../dto';

@Injectable()
export class IamCreateTenantHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamCreateTenantInput | IamCreateTenantDto,
        timezone?: string,
    ): Promise<IamTenant | IamTenantDto>
    {
        await this.commandBus.dispatch(new CreateTenantCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, {}, { timezone }));
    }
}