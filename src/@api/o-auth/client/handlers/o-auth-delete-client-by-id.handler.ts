import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindClientByIdQuery } from '../../../../@apps/o-auth/client/application/find/find-client-by-id.query';
import { DeleteClientByIdCommand } from '../../../../@apps/o-auth/client/application/delete/delete-client-by-id.command';
import { OAuthClient } from '../../../../graphql';
import { ClientDto } from '../dto/client.dto';

@Injectable()
export class OAuthDeleteClientByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient | ClientDto>
    {
        const client = await this.queryBus.ask(new FindClientByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteClientByIdCommand(id, constraint, { timezone }));

        return client;
    }
}