/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { AccessTokenDto } from '../dto/access-token.dto';

// @apps
import { OAuthCreateAccessTokenHandler } from '../handlers/o-auth-create-access-token.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/create')
export class OAuthCreateAccessTokenController
{
    constructor(
        private readonly handler: OAuthCreateAccessTokenHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create access-token' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AccessTokenDto })
    async main(
        @Body() payload: CreateAccessTokenDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}