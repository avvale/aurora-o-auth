/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { AccessTokenDto } from '../dto/access-token.dto';

// @apps
import { OAuthDeleteAccessTokensHandler } from '../handlers/o-auth-delete-access-tokens.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-tokens/delete')
export class OAuthDeleteAccessTokensController
{
    constructor(
        private readonly handler: OAuthDeleteAccessTokensHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete access-tokens in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AccessTokenDto]})
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