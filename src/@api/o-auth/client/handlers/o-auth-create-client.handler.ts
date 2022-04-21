import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindClientByIdQuery } from '../../../../@apps/o-auth/client/application/find/find-client-by-id.query';
import { CreateClientCommand } from '../../../../@apps/o-auth/client/application/create/create-client.command';
import { OAuthClient, OAuthCreateClientInput } from '../../../../graphql';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientDto } from '../dto/client.dto';

@Injectable()
export class OAuthCreateClientHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateClientInput | CreateClientDto,
        timezone?: string,
    ): Promise<OAuthClient | ClientDto>
    {
        await this.commandBus.dispatch(new CreateClientCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindClientByIdQuery(payload.id, {}, { timezone }));
    }
}