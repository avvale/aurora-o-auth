import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreatePermissionRoleHandler } from '../handlers/iam-create-permission-role.handler';
import { IamPermissionRole, IamCreatePermissionRoleInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionRoleResolver
{
    constructor(
        private readonly handler: IamCreatePermissionRoleHandler,
    ) {}

    @Mutation('iamCreatePermissionRole')
    async main(
        @Args('payload') payload: IamCreatePermissionRoleInput,
        @Timezone() timezone?: string,
    ): Promise<IamPermissionRole>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}