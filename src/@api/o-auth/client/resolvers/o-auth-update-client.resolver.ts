import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthUpdateClientHandler } from '../handlers/o-auth-update-client.handler';
import { OAuthClient, OAuthUpdateClientInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.client.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateClientResolver
{
    constructor(
        private readonly handler: OAuthUpdateClientHandler,
    ) {}

    @Mutation('oAuthUpdateClient')
    async main(
        @Args('payload') payload: OAuthUpdateClientInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}