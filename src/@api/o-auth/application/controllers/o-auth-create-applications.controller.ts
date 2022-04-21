/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { ApplicationDto } from '../dto/application.dto';
import { CreateApplicationDto } from '../dto/create-application.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateApplicationsHandler } from '../handlers/o-auth-create-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/create')
@Permissions('oAuth.application.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateApplicationsController
{
    constructor(
        private readonly handler: OAuthCreateApplicationsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create applications in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ApplicationDto]})
    @ApiBody({ type: [CreateApplicationDto]})
    async main(
        @Body() payload: CreateApplicationDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}