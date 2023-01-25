/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamTenantDto, IamUpdateTenantByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertTenantHandler } from '../handlers/iam-upsert-tenant.handler';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/upsert')
@Permissions('iam.tenant.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertTenantController
{
    constructor(
        private readonly handler: IamUpsertTenantHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert tenant' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamTenantDto })
    async main(
        @Body() payload: IamUpdateTenantByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}