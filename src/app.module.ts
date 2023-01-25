import { Module } from '@nestjs/common';
import { CoreModule } from './@aurora/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './@api/iam/iam.module';
import { OAuthModule } from './@api/o-auth/o-auth.module';

@Module({
    imports: [
        CoreModule,
        IamModule,
        OAuthModule
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {}
