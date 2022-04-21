import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindClientByIdQuery } from '../../../../@apps/o-auth/client/application/find/find-client-by-id.query';
import { OAuthClient } from '../../../../graphql';
import { ClientDto } from '../dto/client.dto';

@Injectable()
export class OAuthFindClientByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient | ClientDto>
    {
        return await this.queryBus.ask(new FindClientByIdQuery(id, constraint, { timezone }));
    }
}