/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientDto } from '../dto/client.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateClientHandler } from '../handlers/o-auth-create-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/create')
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateClientController
{
    constructor(
        private readonly handler: OAuthCreateClientHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create client' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ClientDto })
    async main(
        @Body() payload: CreateClientDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}