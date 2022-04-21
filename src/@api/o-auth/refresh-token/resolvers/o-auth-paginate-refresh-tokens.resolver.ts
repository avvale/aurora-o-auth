import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthPaginateRefreshTokensHandler } from '../handlers/o-auth-paginate-refresh-tokens.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthPaginateRefreshTokensResolver
{
    constructor(
        private readonly handler: OAuthPaginateRefreshTokensHandler,
    ) {}

    @Query('oAuthPaginateRefreshTokens')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}