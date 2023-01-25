/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamAccountModel } from '@app/iam/account/infrastructure/sequelize/sequelize-account.model';
import { IamTenantsAccountsModel } from '@app/iam/tenant/infrastructure/sequelize/sequelize-tenants-accounts.model';

@Table({
    modelName: 'IamTenant',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['code'],
            unique: true,
        },
    ],
})
export class IamTenantModel extends Model<IamTenantModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'code',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    code: string;

    @Column({
        field: 'logo',
        allowNull: true,
        type: DataTypes.BLOB('medium'),
    })
    logo: Buffer;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isActive: boolean;

    @Column({
        field: 'meta',
        allowNull: true,
        type: DataTypes.JSON,
    })
    meta: any;


    @BelongsToMany(() => IamAccountModel, {
        through: () => IamTenantsAccountsModel,
        uniqueKey: 'Uq01IamTenantsAccounts',
    })
    accounts: IamAccountModel[];

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}