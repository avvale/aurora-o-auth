import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindApplicationByIdQuery } from '../../../../@apps/o-auth/application/application/find/find-application-by-id.query';
import { OAuthApplication } from '../../../../graphql';
import { ApplicationDto } from '../dto/application.dto';

@Injectable()
export class OAuthFindApplicationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication | ApplicationDto>
    {
        return await this.queryBus.ask(new FindApplicationByIdQuery(id, constraint, { timezone }));
    }
}