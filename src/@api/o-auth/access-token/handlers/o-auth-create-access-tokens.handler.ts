import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateAccessTokensCommand } from '../../../../@apps/o-auth/access-token/application/create/create-access-tokens.command';
import { OAuthCreateAccessTokenInput } from '../../../../graphql';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';

@Injectable()
export class OAuthCreateAccessTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateAccessTokenInput[] | CreateAccessTokenDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateAccessTokensCommand(payload, { timezone }));
        return true;
    }
}