/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthFindRefreshTokenHandler } from '../handlers/o-auth-find-refresh-token.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/find')
@Permissions('oAuth.refreshToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindRefreshTokenController
{
    constructor(
        private readonly handler: OAuthFindRefreshTokenHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find refresh-token according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: RefreshTokenDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}