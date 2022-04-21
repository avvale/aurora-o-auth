import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthFindRefreshTokenHandler } from '../handlers/o-auth-find-refresh-token.handler';
import { OAuthRefreshToken } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindRefreshTokenResolver
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenHandler,
    ) {}

    @Query('oAuthFindRefreshToken')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}