import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { OAuthClientGrantType, OAuthCredential, OAuthCreateCredentialInput } from '../../../../graphql';
import { OAuthCreateCredentialDto, OAuthCredentialDto } from '../dto';

@Injectable()
export class OAuthCreateCredentialHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateCredentialInput | OAuthCreateCredentialDto,
        authorization: string,
    ): Promise<OAuthCredential | OAuthCredentialDto>
    {
        if (payload.grantType === OAuthClientGrantType.AUTHORIZATION_CODE)
        {

        }

        if (payload.grantType === OAuthClientGrantType.CLIENT_CREDENTIALS)
        {
            // get account with email
            const account = await this.queryBus.ask(new OAuthFindAccountQuery({
                where: {
                    email   : payload.email,
                    type    : IamAccountType.SERVICE,
                    isActive: true,
                },
            }));

             // if not exist user throw error
            if (!account) throw new UnauthorizedException();
            return this.clientClientGrantService.getCredential(payload);
        }

        if (payload.grantType === OAuthClientGrantType.PASSWORD)
        {
            return this.passwordGrantService.getCredential(payload, authorization);
        }
    }
}