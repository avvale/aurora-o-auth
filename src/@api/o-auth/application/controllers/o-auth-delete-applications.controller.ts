/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { ApplicationDto } from '../dto/application.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthDeleteApplicationsHandler } from '../handlers/o-auth-delete-applications.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/applications/delete')
@Permissions('oAuth.application.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteApplicationsController
{
    constructor(
        private readonly handler: OAuthDeleteApplicationsHandler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete applications in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ApplicationDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}