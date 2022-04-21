/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { ApplicationDto } from '../dto/application.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthDeleteApplicationByIdHandler } from '../handlers/o-auth-delete-application-by-id.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/delete')
@Permissions('oAuth.application.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthDeleteApplicationByIdController
{
    constructor(
        private readonly handler: OAuthDeleteApplicationByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete application by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ApplicationDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}