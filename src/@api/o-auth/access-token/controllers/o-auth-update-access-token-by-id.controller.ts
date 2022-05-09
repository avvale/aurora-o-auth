/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { OAuthAccessTokenDto, OAuthUpdateAccessTokenByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @apps
import { OAuthUpdateAccessTokenByIdHandler } from '../handlers/o-auth-update-access-token-by-id.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/update')
@Permissions('oAuth.accessToken.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateAccessTokenByIdController
{
    constructor(
        private readonly handler: OAuthUpdateAccessTokenByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update access-token by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: OAuthAccessTokenDto })
    async main(
        @Body() payload: OAuthUpdateAccessTokenByIdDto,
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