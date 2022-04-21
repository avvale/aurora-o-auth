import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateApplicationsCommand } from '../../../../@apps/o-auth/application/application/create/create-applications.command';
import { OAuthCreateApplicationInput } from '../../../../graphql';
import { CreateApplicationDto } from '../dto/create-application.dto';

@Injectable()
export class OAuthCreateApplicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateApplicationInput[] | CreateApplicationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateApplicationsCommand(payload, { timezone }));
        return true;
    }
}