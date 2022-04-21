import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthDeleteApplicationByIdHandler } from '../handlers/o-auth-delete-application-by-id.handler';
import { OAuthApplication } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.application.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteApplicationByIdResolver
{
    constructor(
        private readonly handler: OAuthDeleteApplicationByIdHandler,
    ) {}

    @Mutation('oAuthDeleteApplicationById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}