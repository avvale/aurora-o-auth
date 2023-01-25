import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertRoleHandler } from '../handlers/iam-upsert-role.handler';
import { IamRole, IamUpdateRoleByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertRoleResolver
{
    constructor(
        private readonly handler: IamUpsertRoleHandler,
    ) {}

    @Mutation('iamUpsertRole')
    async main(
        @Args('payload') payload: IamUpdateRoleByIdInput,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}