/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthAccessTokenDto, OAuthUpdateAccessTokensDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateAccessTokensHandler } from '../handlers/o-auth-update-access-tokens.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens/update')
@Permissions('oAuth.accessToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateAccessTokensController
{
    constructor(
        private readonly handler: OAuthUpdateAccessTokensHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update access-tokens' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthAccessTokenDto })
    async main(
        @Body() payload: OAuthUpdateAccessTokensDto,
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