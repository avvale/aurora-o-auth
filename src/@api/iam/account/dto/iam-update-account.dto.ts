/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IamUpdateUserDto } from '../../../iam/user/dto/iam-update-user.dto';
import { IamAccountType } from '../../../../graphql';

export class IamUpdateAccountDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : IamAccountType,
        enum       : ['USER','SERVICE'],
        description: 'type [input here api field description]',
        example    : IamAccountType.USER,
    })
    type?: IamAccountType;

    @ApiProperty({
        type       : String,
        description: 'email [input here api field description]',
        example    : 'john@gmial.com',
    })
    email?: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
        example    : true,
    })
    isActive?: boolean;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
        example    : '1636dec5-7237-477c-8f33-cb6c2b7237a4',
    })
    clientId?: string;

    @ApiProperty({
        type       : Object,
        description: 'dApplicationCodes [input here api field description]',
    })
    dApplicationCodes?: any;

    @ApiProperty({
        type       : Object,
        description: 'dPermissions [input here api field description]',
    })
    dPermissions?: any;

    @ApiProperty({
        type       : Object,
        description: 'dTenants [input here api field description]',
    })
    dTenants?: any;

    @ApiProperty({
        type       : Object,
        description: 'dScopes [input here api field description]',
    })
    dScopes?: any;

    @ApiProperty({
        type       : Object,
        description: 'data [input here api field description]',
    })
    data?: any;

    @ApiProperty({
        type       : [String],
        description: 'roles [input here api field description]',
    })
    roleIds?: string[];

    @ApiProperty({
        type       : [String],
        description: 'tenants [input here api field description]',
    })
    tenantIds?: string[];

    @ApiProperty({
        type       : IamUpdateUserDto,
        description: 'user [input here api field description]',
    })
    user?: IamUpdateUserDto;

}