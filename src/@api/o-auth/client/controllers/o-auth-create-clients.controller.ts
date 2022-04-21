/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { ClientDto } from '../dto/client.dto';
import { CreateClientDto } from '../dto/create-client.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateClientsHandler } from '../handlers/o-auth-create-clients.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/clients/create')
@Permissions('oAuth.client.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateClientsController
{
    constructor(
        private readonly handler: OAuthCreateClientsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create clients in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ClientDto]})
    @ApiBody({ type: [CreateClientDto]})
    async main(
        @Body() payload: CreateClientDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}