import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthUpdateApplicationHandler } from '../handlers/o-auth-update-application.handler';
import { OAuthApplication, OAuthUpdateApplicationInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.application.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateApplicationResolver
{
    constructor(
        private readonly handler: OAuthUpdateApplicationHandler,
    ) {}

    @Mutation('oAuthUpdateApplication')
    async main(
        @Args('payload') payload: OAuthUpdateApplicationInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}