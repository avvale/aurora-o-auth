import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CurrentAccount, Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamUpdateUserMetaByIdHandler } from '../handlers/iam-update-user-meta-by-id.handler';
import { IamUserMeta, IamUpdateUserMetaByIdInput } from '@api/graphql';
import { AccountResponse } from '@app/iam/account/domain/account.response';

@Resolver()
@Permissions('iam.userData.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateUserMetaByIdResolver
{
    constructor(
        private readonly handler: IamUpdateUserMetaByIdHandler,
    ) {}

    @Mutation('iamUpdateUserMetaById')
    async main(
        @Args('payload') payload: IamUpdateUserMetaByIdInput,
        @CurrentAccount() account: AccountResponse,
        @Timezone() timezone?: string,
    ): Promise<IamUserMeta>
    {
        return await this.handler.main(
            payload,
            account,
            timezone,
        );
    }
}