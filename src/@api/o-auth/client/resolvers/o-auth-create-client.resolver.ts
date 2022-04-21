import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateClientHandler } from '../handlers/o-auth-create-client.handler';
import { OAuthClient, OAuthCreateClientInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateClientResolver
{
    constructor(
        private readonly handler: OAuthCreateClientHandler,
    ) {}

    @Mutation('oAuthCreateClient')
    async main(
        @Args('payload') payload: OAuthCreateClientInput,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}