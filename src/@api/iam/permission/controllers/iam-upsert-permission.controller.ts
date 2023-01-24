/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamPermissionDto, IamUpdatePermissionByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertPermissionHandler } from '../handlers/iam-upsert-permission.handler';

@ApiTags('[iam] permission')
@Controller('iam/permission/upsert')
@Permissions('iam.permission.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertPermissionController
{
    constructor(
        private readonly handler: IamUpsertPermissionHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert permission' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamPermissionDto })
    async main(
        @Body() payload: IamUpdatePermissionByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}