/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthCreateRefreshTokensHandler } from '../handlers/o-auth-create-refresh-tokens.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens/create')
@Permissions('oAuth.refreshToken.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthCreateRefreshTokensController
{
    constructor(
        private readonly handler: OAuthCreateRefreshTokensHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create refresh-tokens in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [RefreshTokenDto]})
    @ApiBody({ type: [CreateRefreshTokenDto]})
    async main(
        @Body() payload: CreateRefreshTokenDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}