/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamRoleDto, IamUpdateRoleByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertRoleHandler } from '../handlers/iam-upsert-role.handler';

@ApiTags('[iam] role')
@Controller('iam/role/upsert')
@Permissions('iam.role.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertRoleController
{
    constructor(
        private readonly handler: IamUpsertRoleHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert role' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamRoleDto })
    async main(
        @Body() payload: IamUpdateRoleByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}