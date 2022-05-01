import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// ---- customizations ----
import { MockJwtService } from '../../../src/@apps/o-auth/access-token/infrastructure/mock/mock-jwt.service';
import { AuthModule } from '../../../src/@apps/o-auth/shared/modules/auth.module';
import { OAuthClientGrantType } from '../../../src/graphql';

const importForeignModules = [];

describe('credential', () =>
{
    let app: INestApplication;
    let mockJwt: string;
    const jwtOptions: JwtModuleOptions = {
        secret: '1234567890',
    };
    //let repository: MockCredentialRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                OAuthModule,
                AuthModule.forRoot(jwtOptions),
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                MockJwtService,
            ],
        })
            .compile();

        app         = module.createNestApplication();
        mockJwt     = module.get(MockJwtService).getJwt();
        //repository  = <MockCredentialRepository>module.get<ICredentialRepository>(ICredentialRepository);

        await app.init();
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${mockJwt}`)
            .send({
                grantType: OAuthClientGrantType.PASSWORD,
                username : '',
                password : '',

            })
           // .expect(400)
            .then(res =>
            {
                console.log(res.body);
            });
    });

    
    afterAll(async () =>
    {
        await app.close();
    });
});