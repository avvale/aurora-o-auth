/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { OAuthCreateCredentialDto } from '../dto';

// @apps
import { OAuthCreateCredentialHandler } from '../handlers/o-auth-create-credential.handler';

@ApiTags('[o-auth] access-token')
@Controller('o-auth/access-token/create')
export class OAuthCreateCredentialController
{
    constructor(
        private readonly handler: OAuthCreateCredentialHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create access-token' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: OAuthCreateCredentialDto })
    async main(
        @Body() payload: OAuthCreateCredentialDto,
        @Headers('Authorization') authorization: string,
    )
    {
        return await this.handler.main(
            payload,
            authorization,
        );
    }
}