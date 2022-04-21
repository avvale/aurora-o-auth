import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthDeleteClientByIdHandler } from '../handlers/o-auth-delete-client-by-id.handler';
import { OAuthClient } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.client.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteClientByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteClientByIdHandler,
    ) {}

    @Mutation('oAuthDeleteClientById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthClient>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}