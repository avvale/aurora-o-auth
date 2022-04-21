import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthGetApplicationsHandler } from '../handlers/o-auth-get-applications.handler';
import { OAuthApplication } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthGetApplicationsResolver
{
    constructor(
        private readonly handler: OAuthGetApplicationsHandler,
    ) {}

    @Query('oAuthGetApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}