import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindApplicationQuery } from '../../../../@apps/o-auth/application/application/find/find-application.query';
import { OAuthApplication } from '../../../../graphql';
import { ApplicationDto } from '../dto/application.dto';

@Injectable()
export class OAuthFindApplicationHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplication | ApplicationDto>
    {
        return await this.queryBus.ask(new FindApplicationQuery(queryStatement, constraint, { timezone }));
    }
}