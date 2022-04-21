import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthFindApplicationByIdHandler } from '../handlers/o-auth-find-application-by-id.handler';
import { OAuthApplication } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindApplicationByIdResolver
{
    constructor(
        private readonly handler: OAuthFindApplicationByIdHandler,
    ) {}

    @Query('oAuthFindApplicationById')
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