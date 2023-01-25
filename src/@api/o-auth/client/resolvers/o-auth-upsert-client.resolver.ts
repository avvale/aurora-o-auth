import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthUpsertClientHandler } from '../handlers/o-auth-upsert-client.handler';
import { OAuthClient, OAuthUpdateClientByIdInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.client.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpsertClientResolver
{
    constructor(
        private readonly handler: OAuthUpsertClientHandler,
    ) {}

    @Mutation('oAuthUpsertClient')
    async main(
        @Args('payload') payload: OAuthUpdateClientByIdInput,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}