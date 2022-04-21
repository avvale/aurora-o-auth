import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthUpdateRefreshTokenHandler } from '../handlers/o-auth-update-refresh-token.handler';
import { OAuthRefreshToken, OAuthUpdateRefreshTokenInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateRefreshTokenResolver
{
    constructor(
        private readonly handler: OAuthUpdateRefreshTokenHandler,
    ) {}

    @Mutation('oAuthUpdateRefreshToken')
    async main(
        @Args('payload') payload: OAuthUpdateRefreshTokenInput,
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