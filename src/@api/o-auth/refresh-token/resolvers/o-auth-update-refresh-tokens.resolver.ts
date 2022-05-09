import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateRefreshTokensHandler } from '../handlers/o-auth-update-refresh-tokens.handler';
import { OAuthRefreshToken, OAuthUpdateRefreshTokensInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateRefreshTokensResolver
{
    constructor(
        private readonly handler: OAuthUpdateRefreshTokensHandler,
    ) {}

    @Mutation('oAuthUpdateRefreshTokens')
    async main(
        @Args('payload') payload: OAuthUpdateRefreshTokensInput,
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}