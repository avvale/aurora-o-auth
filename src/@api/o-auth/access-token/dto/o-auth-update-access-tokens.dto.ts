/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthUpdateRefreshTokensDto } from '../../../o-auth/refresh-token/dto/o-auth-update-refresh-tokens.dto';

export class OAuthUpdateAccessTokensDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
        example    : '63d391b2-b9c4-4c72-a6d3-903aaa73a3ab',
    })
    clientId?: string;

    @ApiProperty({
        type       : String,
        description: 'accountId [input here api field description]',
    })
    accountId?: string;

    @ApiProperty({
        type       : String,
        description: 'token [input here api field description]',
    })
    token?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isRevoked [input here api field description]',
    })
    isRevoked?: boolean;

    @ApiProperty({
        type       : String,
        description: 'expiresAt [input here api field description]',
    })
    expiresAt?: string;

    @ApiProperty({
        type       : OAuthUpdateRefreshTokensDto,
        description: 'refreshToken [input here api field description]',
    })
    refreshToken?: OAuthUpdateRefreshTokensDto;

}