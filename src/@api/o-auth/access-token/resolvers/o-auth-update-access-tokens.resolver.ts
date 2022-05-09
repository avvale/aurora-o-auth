import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateAccessTokensHandler } from '../handlers/o-auth-update-access-tokens.handler';
import { OAuthAccessToken, OAuthUpdateAccessTokensInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.accessToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateAccessTokensResolver
{
    constructor(
        private readonly handler: OAuthUpdateAccessTokensHandler,
    ) {}

    @Mutation('oAuthUpdateAccessTokens')
    async main(
        @Args('payload') payload: OAuthUpdateAccessTokensInput,
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}