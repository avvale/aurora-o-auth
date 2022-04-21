import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetClientsQuery } from '../../../../@apps/o-auth/client/application/get/get-clients.query';
import { OAuthClient } from '../../../../graphql';
import { ClientDto } from '../dto/client.dto';

@Injectable()
export class OAuthGetClientsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient[] | ClientDto[]>
    {
        return await this.queryBus.ask(new GetClientsQuery(queryStatement, constraint, { timezone }));
    }
}