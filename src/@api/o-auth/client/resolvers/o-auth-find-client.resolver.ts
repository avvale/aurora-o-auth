import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthFindClientHandler } from '../handlers/o-auth-find-client.handler';
import { OAuthClient } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.client.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindClientResolver
{
    constructor(
        private readonly handler: OAuthFindClientHandler,
    ) {}

    @Query('oAuthFindClient')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}