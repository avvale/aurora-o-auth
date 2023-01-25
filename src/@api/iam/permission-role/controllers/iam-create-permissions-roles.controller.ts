/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamPermissionRoleDto, IamCreatePermissionRoleDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamCreatePermissionsRolesHandler } from '../handlers/iam-create-permissions-roles.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/permissions-roles/create')
@Permissions('iam.role.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreatePermissionsRolesController
{
    constructor(
        private readonly handler: IamCreatePermissionsRolesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permissions roles in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [IamPermissionRoleDto]})
    @ApiBody({ type: [IamCreatePermissionRoleDto]})
    async main(
        @Body() payload: IamCreatePermissionRoleDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}