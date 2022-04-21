import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindClientByIdQuery } from '../../../../@apps/o-auth/client/application/find/find-client-by-id.query';
import { UpdateClientCommand } from '../../../../@apps/o-auth/client/application/update/update-client.command';
import { OAuthClient, OAuthUpdateClientInput } from '../../../../graphql';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientDto } from '../dto/client.dto';

@Injectable()
export class OAuthUpdateClientHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateClientInput | UpdateClientDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient | ClientDto>
    {
        await this.commandBus.dispatch(new UpdateClientCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id, constraint, { timezone }));
    }
}