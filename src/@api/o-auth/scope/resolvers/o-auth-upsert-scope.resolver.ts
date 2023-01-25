import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthUpsertScopeHandler } from '../handlers/o-auth-upsert-scope.handler';
import { OAuthScope, OAuthUpdateScopeByIdInput } from '@api/graphql';

@Resolver()
@Permissions('oAuth.scope.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpsertScopeResolver
{
    constructor(
        private readonly handler: OAuthUpsertScopeHandler,
    ) {}

    @Mutation('oAuthUpsertScope')
    async main(
        @Args('payload') payload: OAuthUpdateScopeByIdInput,
        @Timezone() timezone?: string,
    ): Promise<OAuthScope>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}