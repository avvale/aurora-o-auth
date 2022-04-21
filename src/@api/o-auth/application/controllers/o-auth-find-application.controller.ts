/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { ApplicationDto } from '../dto/application.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthFindApplicationHandler } from '../handlers/o-auth-find-application.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/find')
@Permissions('oAuth.application.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthFindApplicationController
{
    constructor(
        private readonly handler: OAuthFindApplicationHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find application according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ApplicationDto })
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