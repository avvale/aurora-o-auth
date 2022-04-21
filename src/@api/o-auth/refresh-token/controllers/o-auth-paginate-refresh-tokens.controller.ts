/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Constraint, Pagination, QueryStatement, Timezone } from 'aurora-ts-core';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthPaginateRefreshTokensHandler } from '../handlers/o-auth-paginate-refresh-tokens.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-tokens/paginate')
@Permissions('oAuth.refreshToken.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthPaginateRefreshTokensController
{
    constructor(
        private readonly handler: OAuthPaginateRefreshTokensHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate refresh-tokens' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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