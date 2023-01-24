import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertAccountHandler } from '../handlers/iam-upsert-account.handler';
import { IamAccount, IamUpdateAccountByIdInput } from '@api/graphql';

@Resolver()
@Permissions('iam.account.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertAccountResolver
{
    constructor(
        private readonly handler: IamUpsertAccountHandler,
    ) {}

    @Mutation('iamUpsertAccount')
    async main(
        @Args('payload') payload: IamUpdateAccountByIdInput,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}