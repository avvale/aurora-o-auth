import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreateRefreshTokensCommand } from '@app/o-auth/refresh-token/application/create/create-refresh-tokens.command';
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

@Injectable()
export class OAuthRefreshTokenSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateRefreshTokensCommand(
            refreshTokens,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}