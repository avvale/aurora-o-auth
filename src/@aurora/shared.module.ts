import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsConfigModule } from './cqrs-config.module';
import { AddI18NConstraintService, CoreModule } from 'aurora-ts-core';
import { AuthModule } from '../@apps/o-auth/shared/modules/auth.module';
import { jwtConfig } from '../@apps/o-auth/shared/jwt-config';

@Module({
    imports: [
        AuthModule.forRoot(jwtConfig),
        CacheModule.register(),
        ConfigModule.forRoot({ isGlobal: true }),
        CoreModule,
        CqrsConfigModule,
    ],
    providers: [
        AddI18NConstraintService,
    ],
    exports: [
        AddI18NConstraintService,
        AuthModule,
        CacheModule,
        ConfigModule,
        CqrsConfigModule,
    ],
})
export class SharedModule {}
