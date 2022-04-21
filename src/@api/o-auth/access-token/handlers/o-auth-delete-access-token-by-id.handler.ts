import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccessTokenByIdQuery } from '../../../../@apps/o-auth/access-token/application/find/find-access-token-by-id.query';
import { DeleteAccessTokenByIdCommand } from '../../../../@apps/o-auth/access-token/application/delete/delete-access-token-by-id.command';
import { OAuthAccessToken } from '../../../../graphql';
import { AccessTokenDto } from '../dto/access-token.dto';

@Injectable()
export class OAuthDeleteAccessTokenByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken | AccessTokenDto>
    {
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccessTokenByIdCommand(id, constraint, { timezone }));

        return accessToken;
    }
}