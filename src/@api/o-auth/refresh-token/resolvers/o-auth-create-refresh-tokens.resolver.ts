import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateRefreshTokensHandler } from '../handlers/o-auth-create-refresh-tokens.handler';
import { OAuthCreateRefreshTokenInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateRefreshTokensResolver
{
    constructor(
        private readonly handler: OAuthCreateRefreshTokensHandler,
    ) {}

    @Mutation('oAuthCreateRefreshTokens')
    async main(
        @Args('payload') payload: OAuthCreateRefreshTokenInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}