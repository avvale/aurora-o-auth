/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { ApplicationDto } from '../dto/application.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthUpdateApplicationHandler } from '../handlers/o-auth-update-application.handler';

@ApiTags('[o-auth] application')
@Controller('o-auth/application/update')
@Permissions('oAuth.application.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateApplicationController
{
    constructor(
        private readonly handler: OAuthUpdateApplicationHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update application' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ApplicationDto})
    async main(
        @Body() payload: UpdateApplicationDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}