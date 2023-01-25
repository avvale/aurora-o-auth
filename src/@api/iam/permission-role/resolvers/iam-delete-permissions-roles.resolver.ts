import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamDeletePermissionsRolesHandler } from '../handlers/iam-delete-permissions-roles.handler';
import { IamDeletePermissionRoleInput, IamPermissionRole } from '@api/graphql';

@Resolver()
@Permissions('iam.role.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeletePermissionsRolesResolver
{
    constructor(
        private readonly handler: IamDeletePermissionsRolesHandler,
    ) {}

    @Mutation('iamDeletePermissionsRoles')
    async main(
        @Args('payload') payload?: IamDeletePermissionRoleInput[],
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermissionRole[]>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}