import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateApplicationHandler } from '../handlers/o-auth-create-application.handler';
import { OAuthApplication, OAuthCreateApplicationInput } from '../../../../graphql';

@Resolver()
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateApplicationResolver
{
    constructor(
        private readonly handler: OAuthCreateApplicationHandler,
    ) {}

    @Mutation('oAuthCreateApplication')
    async main(
        @Args('payload') payload: OAuthCreateApplicationInput,
        @Timezone() timezone?: string,
    ): Promise<OAuthApplication>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}