import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertTenantHandler } from '../handlers/iam-upsert-tenant.handler';
import { IamTenant, IamUpdateTenantByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.tenant.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertTenantResolver
{
    constructor(
        private readonly handler: IamUpsertTenantHandler,
    ) {}

    @Mutation('iamUpsertTenant')
    async main(
        @Args('payload') payload: IamUpdateTenantByIdInput,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}