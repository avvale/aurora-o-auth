import { Injectable } from '@nestjs/common';
import { ICommandBus } from '@aurora-ts/core';

// @app
import { CreateApplicationsCommand } from '@app/o-auth/application/application/create/create-applications.command';
import { OAuthCreateApplicationInput } from '@api/graphql';
import { OAuthCreateApplicationDto } from '../dto';

@Injectable()
export class OAuthCreateApplicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateApplicationInput[] | OAuthCreateApplicationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateApplicationsCommand(
            payload,
            {
                timezone,
            },
        ));
        return true;
    }
}