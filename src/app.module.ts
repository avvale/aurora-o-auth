import { Module } from '@nestjs/common';
import { CoreModule } from './@aurora/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OAuthModule } from './@api/o-auth/o-auth.module';
import { IamModule } from './@api/iam/iam.module';

@Module({
    imports: [
        CoreModule,
        OAuthModule,
        IamModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {}
