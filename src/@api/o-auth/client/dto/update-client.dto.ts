import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        enum       : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD'],
        description: 'grantType [input here api field description]',
    })
    grantType: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'secret [input here api field description]',
    })
    secret: string;

    @ApiProperty({
        type       : String,
        description: 'authUrl [input here api field description]',
    })
    authUrl: string;

    @ApiProperty({
        type       : String,
        description: 'redirect [input here api field description]',
    })
    redirect: string;

    @ApiProperty({
        type       : Number,
        description: 'expiredAccessToken [input here api field description]',
    })
    expiredAccessToken: number;

    @ApiProperty({
        type       : Number,
        description: 'expiredRefreshToken [input here api field description]',
    })
    expiredRefreshToken: number;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
    })
    isActive: boolean;

    @ApiProperty({
        type       : Boolean,
        description: 'isMaster [input here api field description]',
    })
    isMaster: boolean;

    @ApiProperty({
        type       : [String],
        description: 'applicationIds [input here api field description]',
    })
    applicationIds: string[];

}