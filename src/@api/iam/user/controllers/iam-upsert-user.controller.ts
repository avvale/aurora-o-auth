/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamUserDto, IamUpdateUserByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertUserHandler } from '../handlers/iam-upsert-user.handler';

@ApiTags('[iam] user')
@Controller('iam/user/upsert')
@Permissions('iam.user.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertUserController
{
    constructor(
        private readonly handler: IamUpsertUserHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert user' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamUserDto })
    async main(
        @Body() payload: IamUpdateUserByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}