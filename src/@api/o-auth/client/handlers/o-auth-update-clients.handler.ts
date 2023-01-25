import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetClientsQuery } from '@app/o-auth/client/application/get/get-clients.query';
import { UpdateClientsCommand } from '@app/o-auth/client/application/update/update-clients.command';
import { OAuthClient, OAuthUpdateClientsInput } from '@api/graphql';
import { OAuthClientDto, OAuthUpdateClientsDto } from '../dto';

@Injectable()
export class OAuthUpdateClientsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateClientsInput | OAuthUpdateClientsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient | OAuthClientDto>
    {
        await this.commandBus.dispatch(new UpdateClientsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new GetClientsQuery(queryStatement, constraint, { timezone }));
    }
}