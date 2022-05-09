import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateAccessTokenByIdHandler } from '../handlers/o-auth-update-access-token-by-id.handler';
import { OAuthAccessToken, OAuthUpdateAccessTokenByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.accessToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateAccessTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthUpdateAccessTokenByIdHandler,
    ) {}

    @Mutation('oAuthUpdateAccessTokenById')
    async main(
        @Args('payload') payload: OAuthUpdateAccessTokenByIdInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthAccessToken>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}