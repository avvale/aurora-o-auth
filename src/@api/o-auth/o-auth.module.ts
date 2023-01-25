import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../@aurora/shared.module';
import { OAuthModels, OAuthHandlers, OAuthServices, OAuthRepositories, OAuthSagas } from '@app/o-auth';
import { OAuthApplicationControllers, OAuthApplicationResolvers, OAuthApplicationApiHandlers, OAuthApplicationServices } from './application';
import { OAuthClientControllers, OAuthClientResolvers, OAuthClientApiHandlers, OAuthClientServices } from './client';
import { OAuthAccessTokenControllers, OAuthAccessTokenResolvers, OAuthAccessTokenApiHandlers, OAuthAccessTokenServices } from './access-token';
import { OAuthRefreshTokenControllers, OAuthRefreshTokenResolvers, OAuthRefreshTokenApiHandlers, OAuthRefreshTokenServices } from './refresh-token';
import { OAuthCredentialControllers, OAuthCredentialResolvers, OAuthCredentialApiHandlers } from './credential';
import { OAuthScopeControllers, OAuthScopeResolvers, OAuthScopeApiHandlers, OAuthScopeServices } from './scope';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...OAuthModels
            ])
    ],
    controllers: [
        ...OAuthApplicationControllers,
        ...OAuthClientControllers,
        ...OAuthAccessTokenControllers,
        ...OAuthRefreshTokenControllers,
        ...OAuthCredentialControllers,
        ...OAuthScopeControllers
    ],
    providers: [
        ...OAuthHandlers,
        ...OAuthServices,
        ...OAuthRepositories,
        ...OAuthSagas,
        ...OAuthApplicationResolvers,
        ...OAuthApplicationApiHandlers,
        ...OAuthClientResolvers,
        ...OAuthClientApiHandlers,
        ...OAuthAccessTokenResolvers,
        ...OAuthAccessTokenApiHandlers,
        ...OAuthRefreshTokenResolvers,
        ...OAuthRefreshTokenApiHandlers,
        ...OAuthCredentialResolvers,
        ...OAuthCredentialApiHandlers,
        ...OAuthScopeResolvers,
        ...OAuthScopeApiHandlers,
        ...OAuthAccessTokenServices,
        ...OAuthApplicationServices,
        ...OAuthClientServices,
        ...OAuthRefreshTokenServices,
        ...OAuthScopeServices
    ],
})
export class OAuthModule {}
