/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from '@aurora-ts/core';
import { IamBoundedContextDto, IamUpdateBoundedContextByIdDto } from '../dto';

// authorization
import { Permissions } from '@api/iam/shared/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// @app
import { IamUpsertBoundedContextHandler } from '../handlers/iam-upsert-bounded-context.handler';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context/upsert')
@Permissions('iam.boundedContext.upsert')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpsertBoundedContextController
{
    constructor(
        private readonly handler: IamUpsertBoundedContextHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert bounded-context' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: IamBoundedContextDto })
    async main(
        @Body() payload: IamUpdateBoundedContextByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}