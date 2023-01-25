/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurora-ts/core';
import { IamDeletePermissionRoleDto, IamPermissionRoleDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { IamDeletePermissionRoleByIdHandler } from '../handlers/iam-delete-permission-role-by-id.handler';

@ApiTags('[iam] permission-role')
@Controller('iam/permission-role/delete')
@Permissions('iam.role.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeletePermissionRoleByIdController
{
    constructor(
        private readonly handler: IamDeletePermissionRoleByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete permission role by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: IamPermissionRoleDto })
    async main(
        @Body('payload') payload: IamDeletePermissionRoleDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}