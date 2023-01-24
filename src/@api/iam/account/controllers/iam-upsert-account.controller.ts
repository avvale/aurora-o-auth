/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamAccountDto, IamUpdateAccountByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertAccountHandler } from '../handlers/iam-upsert-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/upsert')
@Permissions('iam.account.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertAccountController
{
    constructor(
        private readonly handler: IamUpsertAccountHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert account' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamAccountDto })
    async main(
        @Body() payload: IamUpdateAccountByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}