import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccessTokenByIdQuery } from '@apps/o-auth/access-token/application/find/find-access-token-by-id.query';
import { UpdateAccessTokenByIdCommand } from '@apps/o-auth/access-token/application/update/update-access-token-by-id.command';
import { OAuthAccessToken, OAuthUpdateAccessTokenByIdInput } from '../../../../graphql';
import { OAuthAccessTokenDto, OAuthUpdateAccessTokenByIdDto } from '../dto';

@Injectable()
export class OAuthUpdateAccessTokenByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateAccessTokenByIdInput | OAuthUpdateAccessTokenByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken | OAuthAccessTokenDto>
    {
        await this.commandBus.dispatch(new UpdateAccessTokenByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAccessTokenByIdQuery(payload.id, constraint, { timezone }));
    }
}