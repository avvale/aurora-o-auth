import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindBoundedContextByIdQuery } from '@app/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { UpsertBoundedContextCommand } from '@app/iam/bounded-context/application/upsert/upsert-bounded-context.command';
import { IamBoundedContext, IamUpdateBoundedContextByIdInput } from '@api/graphql';
import { IamBoundedContextDto, IamUpdateBoundedContextByIdDto } from '../dto';

@Injectable()
export class IamUpsertBoundedContextHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: IamUpdateBoundedContextByIdInput | IamUpdateBoundedContextByIdDto,
        timezone?: string,
    ): Promise<IamBoundedContext | IamBoundedContextDto>
    {
        await this.commandBus.dispatch(new UpsertBoundedContextCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, {}, { timezone }));
    }
}