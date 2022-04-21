/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientDto } from '../dto/client.dto';

// authorization
import { Permissions } from '../../../../@apps/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../../@apps/iam/shared/domain/modules/auth/guards/authorization.guard';

// @apps
import { OAuthUpdateClientHandler } from '../handlers/o-auth-update-client.handler';

@ApiTags('[o-auth] client')
@Controller('o-auth/client/update')
@Permissions('oAuth.client.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class OAuthUpdateClientController
{
    constructor(
        private readonly handler: OAuthUpdateClientHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update client' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: ClientDto})
    async main(
        @Body() payload: UpdateClientDto,
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