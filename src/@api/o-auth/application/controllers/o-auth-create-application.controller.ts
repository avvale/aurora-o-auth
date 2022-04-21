/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { ApplicationDto } from '../dto/application.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateApplicationHandler } from '../handlers/o-auth-create-application.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/create')
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateApplicationController
{
    constructor(
        private readonly handler: OAuthCreateApplicationHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create application' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
    async main(
        @Body() payload: CreateApplicationDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}