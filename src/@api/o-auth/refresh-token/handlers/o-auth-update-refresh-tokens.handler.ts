import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetRefreshTokensQuery } from '@apps/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { UpdateRefreshTokensCommand } from '@apps/o-auth/refresh-token/application/update/update-refresh-tokens.command';
import { OAuthRefreshToken, OAuthUpdateRefreshTokensInput } from '../../../../graphql';
import { OAuthRefreshTokenDto, OAuthUpdateRefreshTokensDto } from '../dto';

@Injectable()
export class OAuthUpdateRefreshTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateRefreshTokensInput | OAuthUpdateRefreshTokensDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken | OAuthRefreshTokenDto>
    {
        await this.commandBus.dispatch(new UpdateRefreshTokensCommand(payload, queryStatement, constraint, { timezone }));

        return await this.queryBus.ask(new GetRefreshTokensQuery(queryStatement, constraint, { timezone }));
    }
}