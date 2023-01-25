/* eslint-disable indent */
/* eslint-disable key-spacing */
import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamPermissionModel } from '@app/iam/permission/infrastructure/sequelize/sequelize-permission.model';
import { IamRoleModel } from '@app/iam/role/infrastructure/sequelize/sequelize-role.model';

@Table({
    modelName: 'IamPermissionsRoles',
    freezeTableName: true,
    timestamps: false,
})
export class IamPermissionsRolesModel extends Model<IamPermissionsRolesModel>
{
    @ForeignKey(() => IamPermissionModel)
    @Column({
        field: 'permissionId',
        type: DataTypes.UUID,
    })
    permissionId: string;

    @BelongsTo(() => IamPermissionModel, {
        constraints: false,
        foreignKey: 'permissionId',
    })
    permission: IamPermissionModel;

    @ForeignKey(() => IamRoleModel)
    @Column({
        field: 'roleId',
        type: DataTypes.UUID,
    })
    roleId: string;

    @BelongsTo(() => IamRoleModel, {
        constraints: false,
        foreignKey: 'roleId',
    })
    role: IamRoleModel;
}