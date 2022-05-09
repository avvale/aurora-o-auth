import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindRefreshTokenByIdQuery } from '@apps/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { UpdateRefreshTokenByIdCommand } from '@apps/o-auth/refresh-token/application/update/update-refresh-token-by-id.command';
import { OAuthRefreshToken, OAuthUpdateRefreshTokenByIdInput } from '../../../../graphql';
import { OAuthRefreshTokenDto, OAuthUpdateRefreshTokenByIdDto } from '../dto';

@Injectable()
export class OAuthUpdateRefreshTokenByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateRefreshTokenByIdInput | OAuthUpdateRefreshTokenByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken | OAuthRefreshTokenDto>
    {
        await this.commandBus.dispatch(new UpdateRefreshTokenByIdCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(payload.id, constraint, { timezone }));
    }
}