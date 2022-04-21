/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateRefreshTokenDto } from '../dto/update-refresh-token.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthUpdateRefreshTokenHandler } from '../handlers/o-auth-update-refresh-token.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/update')
@Permissions('oAuth.refreshToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateRefreshTokenController
{
    constructor(
        private readonly handler: OAuthUpdateRefreshTokenHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update refresh-token' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: RefreshTokenDto})
    async main(
        @Body() payload: UpdateRefreshTokenDto,
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