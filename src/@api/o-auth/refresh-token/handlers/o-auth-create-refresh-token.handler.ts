import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindRefreshTokenByIdQuery } from '../../../../@apps/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { CreateRefreshTokenCommand } from '../../../../@apps/o-auth/refresh-token/application/create/create-refresh-token.command';
import { OAuthRefreshToken, OAuthCreateRefreshTokenInput } from '../../../../graphql';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class OAuthCreateRefreshTokenHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateRefreshTokenInput | CreateRefreshTokenDto,
        timezone?: string,
    ): Promise<OAuthRefreshToken | RefreshTokenDto>
    {
        await this.commandBus.dispatch(new CreateRefreshTokenCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(payload.id, {}, { timezone }));
    }
}