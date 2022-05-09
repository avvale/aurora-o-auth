/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdatePermissionsDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'boundedContextId [input here api field description]',
        example    : '7737225b-89ce-4637-aa02-63eafc192d8b',
    })
    boundedContextId?: string;

    @ApiProperty({
        type       : [String],
        description: 'roles [input here api field description]',
    })
    roleIds?: string[];

}