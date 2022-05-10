/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OAuthUpdateRefreshTokenByIdDto } from '../../../o-auth/refresh-token/dto/o-auth-update-refresh-token-by-id.dto';

export class OAuthUpdateAccessTokenByIdDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
        example    : '80c53983-9bad-47da-9627-c27e79bbb796',
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
        type       : OAuthUpdateRefreshTokenByIdDto,
        description: 'refreshToken [input here api field description]',
    })
    refreshToken?: OAuthUpdateRefreshTokenByIdDto;

}