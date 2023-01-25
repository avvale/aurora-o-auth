/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { OAuthApplicationDto, OAuthUpdateApplicationByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthUpsertApplicationHandler } from '../handlers/o-auth-upsert-application.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/upsert')
@Permissions('oAuth.application.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpsertApplicationController
{
    constructor(
        private readonly handler: OAuthUpsertApplicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert application' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: OAuthApplicationDto })
    async main(
        @Body() payload: OAuthUpdateApplicationByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}