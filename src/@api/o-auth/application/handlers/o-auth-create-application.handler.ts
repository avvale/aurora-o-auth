import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindApplicationByIdQuery } from '../../../../@apps/o-auth/application/application/find/find-application-by-id.query';
import { CreateApplicationCommand } from '../../../../@apps/o-auth/application/application/create/create-application.command';
import { OAuthApplication, OAuthCreateApplicationInput } from '../../../../graphql';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { ApplicationDto } from '../dto/application.dto';

@Injectable()
export class OAuthCreateApplicationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateApplicationInput | CreateApplicationDto,
        timezone?: string,
    ): Promise<OAuthApplication | ApplicationDto>
    {
        await this.commandBus.dispatch(new CreateApplicationCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id, {}, { timezone }));
    }
}