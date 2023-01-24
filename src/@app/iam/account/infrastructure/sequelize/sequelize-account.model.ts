/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamUserModel } from '@app/iam/user/infrastructure/sequelize/sequelize-user.model';
import { OAuthClientModel } from '@app/o-auth/client/infrastructure/sequelize/sequelize-client.model';
import { IamRoleModel } from '@app/iam/role/infrastructure/sequelize/sequelize-role.model';
import { IamRolesAccountsModel } from '@app/iam/role/infrastructure/sequelize/sequelize-roles-accounts.model';
import { IamTenantModel } from '@app/iam/tenant/infrastructure/sequelize/sequelize-tenant.model';
import { IamTenantsAccountsModel } from '@app/iam/tenant/infrastructure/sequelize/sequelize-tenants-accounts.model';

@Table({
    modelName: 'IamAccount',
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            fields: ['code'],
            unique: true,
        },
        {
            fields: ['email'],
            unique: true,
        },
    ],
})
export class IamAccountModel extends Model<IamAccountModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'type',
        allowNull: false,
        type: DataTypes.ENUM('USER','SERVICE'),
    })
    type: string;

    @Column({
        field: 'code',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    code: string;

    @Column({
        field: 'email',
        allowNull: false,
        type: DataTypes.STRING(120),
    })
    email: string;

    @Column({
        field: 'isActive',
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    })
    isActive: boolean;

    @ForeignKey(() => OAuthClientModel)
    @Column({
        field: 'clientId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    clientId: string;

    @BelongsTo(() => OAuthClientModel, {
        constraints: false,
        foreignKey: 'clientId',
    })
    client: OAuthClientModel;

    @Column({
        field: 'scopes',
        allowNull: true,
        type: DataTypes.JSON,
    })
    scopes: any;

    @Column({
        field: 'dApplicationCodes',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dApplicationCodes: any;

    @Column({
        field: 'dPermissions',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dPermissions: any;

    @Column({
        field: 'dTenants',
        allowNull: false,
        type: DataTypes.JSON,
    })
    dTenants: any;

    @Column({
        field: 'meta',
        allowNull: true,
        type: DataTypes.JSON,
    })
    meta: any;


    @BelongsToMany(() => IamRoleModel, {
        through: () => IamRolesAccountsModel,
        uniqueKey: 'Uq01IamRolesAccounts',
    })
    roles: IamRoleModel[];


    @BelongsToMany(() => IamTenantModel, {
        through: () => IamTenantsAccountsModel,
        uniqueKey: 'Uq01IamTenantsAccounts',
    })
    tenants: IamTenantModel[];


    @HasOne(() => IamUserModel)
    user: IamUserModel;

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