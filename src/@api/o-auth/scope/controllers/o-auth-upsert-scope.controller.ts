/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { OAuthScopeDto, OAuthUpdateScopeByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { OAuthUpsertScopeHandler } from '../handlers/o-auth-upsert-scope.handler';

@ApiTags('[o-auth] scope')
@Controller('o-auth/scope/upsert')
@Permissions('oAuth.scope.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpsertScopeController
{
    constructor(
        private readonly handler: OAuthUpsertScopeHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert scope' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: OAuthScopeDto })
    async main(
        @Body() payload: OAuthUpdateScopeByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}