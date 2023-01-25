import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import { AddI18NConstraintService, CoreModule } from '@aurora-ts/core';
import { CqrsConfigModule } from './cqrs-config.module';
import { AuthModule } from '../@app/o-auth/shared/modules/auth.module';
import { jwtConfig } from '../@app/o-auth/shared/jwt-config';

@Module({
    imports: [
        CacheModule.register(),
        ConfigModule.forRoot({ isGlobal: true }),
        CoreModule,
        CqrsConfigModule,
        CqrsModule,
        HttpModule,
        AuthModule.forRoot(jwtConfig)
    ],
    providers: [
        AddI18NConstraintService,
    ],
    exports: [
        AddI18NConstraintService,
        CacheModule,
        ConfigModule,
        CqrsConfigModule,
        HttpModule,
        AuthModule
    ],
})
export class SharedModule {}
