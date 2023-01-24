import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertPermissionHandler } from '../handlers/iam-upsert-permission.handler';
import { IamPermission, IamUpdatePermissionByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.permission.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertPermissionResolver
{
    constructor(
        private readonly handler: IamUpsertPermissionHandler,
    ) {}

    @Mutation('iamUpsertPermission')
    async main(
        @Args('payload') payload: IamUpdatePermissionByIdInput,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}