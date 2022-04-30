import * as fs from 'fs';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AddI18NConstraintService, CoreModule, ICommandBus, ICriteria, IQueryBus, NestCommandBus, NestQueryBus, SequelizeCriteria } from 'aurora-ts-core';
import { AuthModule } from 'src/@apps/o-auth/shared/modules/auth.module';

@Module({
    imports: [
        CoreModule,
        CacheModule.register(),
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule.forRoot({
            privateKey : fs.readFileSync('src/oauth-private.key', 'utf8'),
            publicKey  : fs.readFileSync('src/oauth-public.key', 'utf8'),
            signOptions: {
                algorithm: 'RS256',
            },
        }),
        CqrsModule,
    ],
    providers: [
        AddI18NConstraintService,
        {
            provide : ICommandBus,
            useClass: NestCommandBus,
        },
        {
            provide : IQueryBus,
            useClass: NestQueryBus,
        },
        {
            provide : ICriteria,
            useClass: SequelizeCriteria,
        },
    ],
    exports: [
        AddI18NConstraintService,
        CacheModule,
        ConfigModule,
        CqrsModule,
        AuthModule,
        {
            provide : ICommandBus,
            useClass: NestCommandBus,
        },
        {
            provide : IQueryBus,
            useClass: NestQueryBus,
        },
        {
            provide : ICriteria,
            useClass: SequelizeCriteria,
        },
    ],
})
export class SharedModule {}
