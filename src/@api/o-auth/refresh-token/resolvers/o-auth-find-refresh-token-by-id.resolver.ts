import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthFindRefreshTokenByIdHandler } from '../handlers/o-auth-find-refresh-token-by-id.handler';
import { OAuthRefreshToken } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindRefreshTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenByIdHandler,
    ) {}

    @Query('oAuthFindRefreshTokenById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthRefreshToken>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}