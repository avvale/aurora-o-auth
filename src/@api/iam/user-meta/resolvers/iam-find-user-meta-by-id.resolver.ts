import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';
import { IamUserMeta } from '@api/graphql';

@Resolver()
@Permissions('iam.userData.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindUserMetaByIdResolver
{
    constructor(
        private readonly handler: IamFindUserMetaByIdHandler,
    ) {}

    @Query('iamFindUserMetaById')
    async main(
        @Args('id') id: string,
        @Timezone() timezone?: string,
    ): Promise<IamUserMeta>
    {
        return await this.handler.main(
            id,
            timezone,
        );
    }
}