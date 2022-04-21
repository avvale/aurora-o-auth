import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthDeleteRefreshTokenByIdHandler } from '../handlers/o-auth-delete-refresh-token-by-id.handler';
import { OAuthRefreshToken } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.refreshToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteRefreshTokenByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokenByIdHandler,
    ) {}

    @Mutation('oAuthDeleteRefreshTokenById')
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