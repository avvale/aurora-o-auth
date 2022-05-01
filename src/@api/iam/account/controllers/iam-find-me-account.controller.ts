/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, HttpCode, Headers, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { IamAccountDto } from '../dto';

// @apps
import { IamFindMeAccountHandler } from '../handlers/iam-find-me-account.handler';

@ApiTags('[iam] account')
@Controller('iam/account/find/me')
export class IamFindMeAccountController
{
    constructor(
        private readonly handler: IamFindMeAccountHandler,
    ) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find account according to header authorization jwt' })
    @ApiOkResponse({ description: 'The account is returned.', type: IamAccountDto })
    async main(
        @Headers('Authorization') authorization: string,
    )
    {
        return await this.handler.main(
            authorization,
        );
    }
}