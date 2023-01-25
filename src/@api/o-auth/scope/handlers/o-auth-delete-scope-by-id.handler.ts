import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindScopeByIdQuery } from '@app/o-auth/scope/application/find/find-scope-by-id.query';
import { DeleteScopeByIdCommand } from '@app/o-auth/scope/application/delete/delete-scope-by-id.command';
import { OAuthScope } from '@api/graphql';
import { OAuthScopeDto } from '../dto';

@Injectable()
export class OAuthDeleteScopeByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthScope | OAuthScopeDto>
    {
        const scope = await this.queryBus.ask(new FindScopeByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteScopeByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return scope;
    }
}