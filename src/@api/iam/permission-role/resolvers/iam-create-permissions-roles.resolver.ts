import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreatePermissionsRolesHandler } from '../handlers/iam-create-permissions-roles.handler';
import { IamCreatePermissionRoleInput } from '@api/graphql';

@Resolver()
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionsRolesResolver
{
    constructor(
        private readonly handler: IamCreatePermissionsRolesHandler,
    ) {}

    @Mutation('iamCreatePermissionsRoles')
    async main(
        @Args('payload') payload: IamCreatePermissionRoleInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}