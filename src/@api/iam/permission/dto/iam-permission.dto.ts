/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IamRoleDto } from '../../../iam/role/dto/iam-role.dto';
import { IamBoundedContextDto } from '../../../iam/bounded-context/dto/iam-bounded-context.dto';

export class IamPermissionDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'boundedContextId [input here api field description]',
        example    : '6cb8bd12-e788-468c-a45a-09310599503c',
    })
    boundedContextId: string;

    @ApiProperty({
        type       : () => IamBoundedContextDto,
        description: 'IamBoundedContext [input here api field description]',
    })
    boundedContext?: IamBoundedContextDto;

    @ApiProperty({
        type       : () => [IamRoleDto],
        description: 'roles [input here api field description]',
    })
    roles?: IamRoleDto[];

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}