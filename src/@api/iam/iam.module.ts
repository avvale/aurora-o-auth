import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../@aurora/shared.module';
import { IamModels, IamHandlers, IamServices, IamRepositories, IamSagas } from '@app/iam';
import { IamBoundedContextControllers, IamBoundedContextResolvers, IamBoundedContextApiHandlers, IamBoundedContextServices } from './bounded-context';
import { IamPermissionControllers, IamPermissionResolvers, IamPermissionApiHandlers, IamPermissionServices } from './permission';
import { IamPermissionRoleControllers, IamPermissionRoleResolvers, IamPermissionRoleApiHandlers } from './permission-role';
import { IamTenantControllers, IamTenantResolvers, IamTenantApiHandlers, IamTenantServices } from './tenant';
import { IamRoleControllers, IamRoleResolvers, IamRoleApiHandlers, IamRoleServices } from './role';
import { IamAccountControllers, IamAccountResolvers, IamAccountApiHandlers, IamAccountServices } from './account';
import { IamUserControllers, IamUserResolvers, IamUserApiHandlers, IamUserServices } from './user';
import { IamUserMetaControllers, IamUserMetaResolvers, IamUserMetaApiHandlers } from './user-meta';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...IamModels,
        ]),
    ],
    controllers: [
        ...IamAccountControllers,
        ...IamBoundedContextControllers,
        ...IamPermissionControllers,
        ...IamPermissionRoleControllers,
        ...IamRoleControllers,
        ...IamTenantControllers,
        ...IamUserControllers,
        ...IamUserMetaControllers,
    ],
    providers: [
        ...IamAccountApiHandlers,
        ...IamAccountResolvers,
        ...IamBoundedContextApiHandlers,
        ...IamBoundedContextResolvers,
        ...IamHandlers,
        ...IamPermissionApiHandlers,
        ...IamPermissionResolvers,
        ...IamPermissionRoleApiHandlers,
        ...IamPermissionRoleResolvers,
        ...IamRepositories,
        ...IamRoleApiHandlers,
        ...IamRoleResolvers,
        ...IamSagas,
        ...IamServices,
        ...IamTenantApiHandlers,
        ...IamTenantResolvers,
        ...IamUserApiHandlers,
        ...IamUserMetaApiHandlers,
        ...IamUserMetaResolvers,
        ...IamUserResolvers,
        ...IamAccountServices,
        ...IamBoundedContextServices,
        ...IamPermissionServices,
        ...IamRoleServices,
        ...IamTenantServices,
        ...IamUserServices
    ],
})
export class IamModule {}
