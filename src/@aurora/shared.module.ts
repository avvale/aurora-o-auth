import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AddI18NConstraintService, CoreModule, ICommandBus, ICriteria, IQueryBus, NestCommandBus, NestQueryBus, SequelizeCriteria } from 'aurora-ts-core';
import { AuthModule } from '@apps/iam/shared/domain/modules/auth/auth.module.ts';

@Module({
    imports: [
        CoreModule,
        CacheModule.register(),
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule,
        AuthModule
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
        }
    ],
    exports: [
        AddI18NConstraintService,
        CacheModule,
        ConfigModule,
        CqrsModule,
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
        AuthModule
    ]
})
export class SharedModule {}
