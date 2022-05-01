import * as fs from 'fs';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsConfigModule } from './cqrs-config.module';
import { AddI18NConstraintService, CoreModule } from 'aurora-ts-core';
import { AuthModule } from 'src/@apps/o-auth/shared/modules/auth.module';

@Module({
    imports: [
        AuthModule.forRoot({
            privateKey : fs.readFileSync('src/oauth-private.key', 'utf8'),
            publicKey  : fs.readFileSync('src/oauth-public.key', 'utf8'),
            signOptions: {
                algorithm: 'RS256',
            },
        }),
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
