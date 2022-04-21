import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';
import { OAuthCreateClientInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateClientsResolver
{
    constructor(
        private readonly handler: OAuthCreateClientsHandler,
    ) {}

    @Mutation('oAuthCreateClients')
    async main(
        @Args('payload') payload: OAuthCreateClientInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}