/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthRefreshTokenDto, OAuthUpdateRefreshTokenByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateRefreshTokenByIdHandler } from '../handlers/o-auth-update-refresh-token-by-id.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/update')
@Permissions('oAuth.refreshToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateRefreshTokenByIdController
{
    constructor(
        private readonly handler: OAuthUpdateRefreshTokenByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthRefreshTokenDto })
    async main(
        @Body() payload: OAuthUpdateRefreshTokenByIdDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}