/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { ApplicationDto } from '../dto/application.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthFindApplicationByIdHandler } from '../handlers/o-auth-find-application-by-id.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/find')
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindApplicationByIdController
{
    constructor(
        private readonly handler: OAuthFindApplicationByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find application by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
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