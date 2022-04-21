/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateAccessTokenDto } from '../dto/update-access-token.dto';
import { AccessTokenDto } from '../dto/access-token.dto';

// @apps
import { OAuthUpdateAccessTokenHandler } from '../handlers/o-auth-update-access-token.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/update')
export class OAuthUpdateAccessTokenController
{
    constructor(
        private readonly handler: OAuthUpdateAccessTokenHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update access-token' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AccessTokenDto})
    async main(
        @Body() payload: UpdateAccessTokenDto,
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