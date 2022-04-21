import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccessTokenByIdQuery } from '../../../../@apps/o-auth/access-token/application/find/find-access-token-by-id.query';
import { OAuthAccessToken } from '../../../../graphql';
import { AccessTokenDto } from '../dto/access-token.dto';

@Injectable()
export class OAuthFindAccessTokenByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken | AccessTokenDto>
    {
        return await this.queryBus.ask(new FindAccessTokenByIdQuery(id, constraint, { timezone }));
    }
}