import { EnumValueObject, ValidationRules } from 'aurora-ts-core';

export class ClientGrantType extends EnumValueObject
{
    public readonly type: 'ClientGrantType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientGrantType',
            nullable   : false,
            undefinable: false,
            enumOptions:  ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD'],
        }, validationRules));
    }
}