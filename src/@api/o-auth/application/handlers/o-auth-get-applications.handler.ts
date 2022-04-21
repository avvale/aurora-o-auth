import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetApplicationsQuery } from '../../../../@apps/o-auth/application/application/get/get-applications.query';
import { OAuthApplication } from '../../../../graphql';
import { ApplicationDto } from '../dto/application.dto';

@Injectable()
export class OAuthGetApplicationsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication[] | ApplicationDto[]>
    {
        return await this.queryBus.ask(new GetApplicationsQuery(queryStatement, constraint, { timezone }));
    }
}