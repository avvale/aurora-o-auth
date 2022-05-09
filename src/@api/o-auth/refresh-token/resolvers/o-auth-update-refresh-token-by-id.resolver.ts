import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateRefreshTokenByIdHandler } from '../handlers/o-auth-update-refresh-token-by-id.handler';
import { OAuthRefreshToken, OAuthUpdateRefreshTokenByIdInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateRefreshTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthUpdateRefreshTokenByIdHandler,
    ) {}

    @Mutation('oAuthUpdateRefreshTokenById')
    async main(
        @Args('payload') payload: OAuthUpdateRefreshTokenByIdInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}