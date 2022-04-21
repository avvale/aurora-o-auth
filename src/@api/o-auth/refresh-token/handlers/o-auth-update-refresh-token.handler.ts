import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindRefreshTokenByIdQuery } from '../../../../@apps/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { UpdateRefreshTokenCommand } from '../../../../@apps/o-auth/refresh-token/application/update/update-refresh-token.command';
import { OAuthRefreshToken, OAuthUpdateRefreshTokenInput } from '../../../../graphql';
import { UpdateRefreshTokenDto } from '../dto/update-refresh-token.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class OAuthUpdateRefreshTokenHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateRefreshTokenInput | UpdateRefreshTokenDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken | RefreshTokenDto>
    {
        await this.commandBus.dispatch(new UpdateRefreshTokenCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(payload.id, constraint, { timezone }));
    }
}