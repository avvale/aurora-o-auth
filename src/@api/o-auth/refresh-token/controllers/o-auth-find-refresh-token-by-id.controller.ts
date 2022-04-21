/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthFindRefreshTokenByIdHandler } from '../handlers/o-auth-find-refresh-token-by-id.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/find')
@Permissions('oAuth.refreshToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindRefreshTokenByIdController
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: RefreshTokenDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}