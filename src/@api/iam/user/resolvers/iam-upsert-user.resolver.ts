import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertUserHandler } from '../handlers/iam-upsert-user.handler';
import { IamUser, IamUpdateUserByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.user.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertUserResolver
{
    constructor(
        private readonly handler: IamUpsertUserHandler,
    ) {}

    @Mutation('iamUpsertUser')
    async main(
        @Args('payload') payload: IamUpdateUserByIdInput,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}