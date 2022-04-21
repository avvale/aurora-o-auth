/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateRefreshTokenHandler } from '../handlers/o-auth-create-refresh-token.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/create')
@Permissions('oAuth.refreshToken.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateRefreshTokenController
{
    constructor(
        private readonly handler: OAuthCreateRefreshTokenHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create refresh-token' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: RefreshTokenDto })
    async main(
        @Body() payload: CreateRefreshTokenDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}