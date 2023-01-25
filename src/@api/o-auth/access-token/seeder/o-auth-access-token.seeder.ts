import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreateAccessTokensCommand } from '@app/o-auth/access-token/application/create/create-access-tokens.command';
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';

@Injectable()
export class OAuthAccessTokenSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAccessTokensCommand(
            accessTokens,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}