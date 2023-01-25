/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamUserMetaDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamFindUserMetaByIdHandler } from '../handlers/iam-find-user-meta-by-id.handler';

@ApiTags('[iam] user')
@Controller('iam/user-data/find')
@Permissions('iam.userData.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamFindUserMetaByIdController
{
    constructor(
        private readonly handler: IamFindUserMetaByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find user data by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: IamUserMetaDto })
    async main(
        @Param('id') id: string,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            timezone,
        );
    }
}