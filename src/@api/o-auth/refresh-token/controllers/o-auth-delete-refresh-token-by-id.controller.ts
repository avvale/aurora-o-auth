/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthDeleteRefreshTokenByIdHandler } from '../handlers/o-auth-delete-refresh-token-by-id.handler';

@ApiTags('[o-auth] refresh-token')
@Controller('o-auth/refresh-token/delete')
@Permissions('oAuth.refreshToken.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteRefreshTokenByIdController
{
    constructor(
        private readonly handler: OAuthDeleteRefreshTokenByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete refresh-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: RefreshTokenDto })
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