import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthUpsertApplicationHandler } from '../handlers/o-auth-upsert-application.handler';
import { OAuthApplication, OAuthUpdateApplicationByIdInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.application.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpsertApplicationResolver
{
    constructor(
        private readonly handler: OAuthUpsertApplicationHandler,
    ) {}

    @Mutation('oAuthUpsertApplication')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationByIdInput,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}