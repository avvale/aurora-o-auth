/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamPermissionRoleDto, IamCreatePermissionRoleDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreatePermissionRoleHandler } from '../handlers/iam-create-permission-role.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/role/create')
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionRoleController
{
    constructor(
        private readonly handler: IamCreatePermissionRoleHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permission' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: IamPermissionRoleDto })
    async main(
        @Body() payload: IamCreatePermissionRoleDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}