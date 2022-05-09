/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthRefreshTokenDto, OAuthUpdateRefreshTokensDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateRefreshTokensHandler } from '../handlers/o-auth-update-refresh-tokens.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens/update')
@Permissions('oAuth.refreshToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateRefreshTokensController
{
    constructor(
        private readonly handler: OAuthUpdateRefreshTokensHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update refresh-tokens' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthRefreshTokenDto })
    async main(
        @Body() payload: OAuthUpdateRefreshTokensDto,
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}