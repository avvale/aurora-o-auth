import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetAccessTokensQuery } from '@apps/o-auth/access-token/application/get/get-access-tokens.query';
import { UpdateAccessTokensCommand } from '@apps/o-auth/access-token/application/update/update-access-tokens.command';
import { OAuthAccessToken, OAuthUpdateAccessTokensInput } from '../../../../graphql';
import { OAuthAccessTokenDto, OAuthUpdateAccessTokensDto } from '../dto';

@Injectable()
export class OAuthUpdateAccessTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateAccessTokensInput | OAuthUpdateAccessTokensDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken | OAuthAccessTokenDto>
    {
        await this.commandBus.dispatch(new UpdateAccessTokensCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetAccessTokensQuery(queryStatement, constraint, { timezone }));
    }
}