/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { OAuthClientDto, OAuthUpdateClientByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthUpsertClientHandler } from '../handlers/o-auth-upsert-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/upsert')
@Permissions('oAuth.client.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpsertClientController
{
    constructor(
        private readonly handler: OAuthUpsertClientHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert client' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: OAuthClientDto })
    async main(
        @Body() payload: OAuthUpdateClientByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}