import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertBoundedContextHandler } from '../handlers/iam-upsert-bounded-context.handler';
import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.boundedContext.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertBoundedContextResolver
{
    constructor(
        private readonly handler: IamUpsertBoundedContextHandler,
    ) {}

    @Mutation('iamUpsertBoundedContext')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextByIdInput,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}