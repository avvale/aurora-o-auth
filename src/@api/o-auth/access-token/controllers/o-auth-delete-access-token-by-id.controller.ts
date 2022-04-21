/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { AccessTokenDto } from '../dto/access-token.dto';

// @apps
import { OAuthDeleteAccessTokenByIdHandler } from '../handlers/o-auth-delete-access-token-by-id.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/delete')
export class OAuthDeleteAccessTokenByIdController
{
    constructor(
        private readonly handler: OAuthDeleteAccessTokenByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete access-token by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: AccessTokenDto })
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