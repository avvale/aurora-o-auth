/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '../../../src/@apps/o-auth/client/domain/client.repository';
import { MockClientSeeder } from '../../../src/@apps/o-auth/client/infrastructure/mock/mock-client.seeder';
import { clients } from '../../../src/@apps/o-auth/client/infrastructure/seeds/client.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '../../../src/@apps/iam/account/domain/account.repository';
import { MockAccountRepository } from '../../../src/@apps/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from '../../../src/@api/iam/iam.module';
import { AuthorizationGuard } from '../../../src/@api/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from '../../../src/@api/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let repository: IClientRepository;
    let seeder: MockClientSeeder;
    let testJwt: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                OAuthModule,
                IamModule,
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
                JwtModule.register({
                    privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                    publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                    signOptions: {
                        algorithm: 'RS256',
                    }
                }),
            ],
            providers: [
                MockClientSeeder,
                TestingJwtService,
            ],
        })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData        = clients;
        app             = module.createNestApplication();
        repository      = module.get<IClientRepository>(IClientRepository);
        seeder          = module.get<MockClientSeeder>(MockClientSeeder);
        testJwt         = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientGrantType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ grantType: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ name: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientSecret property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ secret: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isActive: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsMaster property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isMaster: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientGrantType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ grantType: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ name: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientSecret property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ secret: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isActive: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsMaster property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isMaster: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ name: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ secret: '*******************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ authUrl: '*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ redirect: '*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ expiredAccessToken: 11111111111 },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ expiredRefreshToken: 11111111111 },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ expiredAccessToken: -1 },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ expiredRefreshToken: -1 },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isActive: 'true' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientIsMaster has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isMaster: 'true' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ grantType: '****' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });

    test('/REST:POST o-auth/client/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/clients/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/clients/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'applicationIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/clients/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/clients/get')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'applicationIds']))),
                );
            });
    });

    test('/REST:POST o-auth/client/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/find')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'e0ef4714-fe04-4428-a273-cbec7cc7d2be',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/client/create', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST o-auth/client/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/find')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET o-auth/client/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/find/8894a175-038d-4422-a260-39a68657815e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test('/REST:GET o-auth/client/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT o-auth/client/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/client/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: '9c918ed5-8007-4e4d-ab8a-0e69d05184e9' },
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/client/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/client/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'Small Plastic Pants',
                secret: '3oa3zfzle21ibwkfebz7qweixbkl1ozuaq7o0lsc4bqsjygt9asuv4w1llbuhnc8rppb40xdn0ykt73kgnmqgfivr',
                authUrl: 'eyounhh61c65dg21dqme1a93r14djrukj1u45iswckpujsz27uarv4zbhwozscu4ue9g8bydyz17ou5vh8dhjyxy68n9hawqtn3vuqs5hyhbc0adwezv65xxynh4rimc0w5in0mgvywep0yi9275pofoioxljhtjffswbhnuhddn04lmmyt0kgoo79kks5xnl44z5299pkofukgs4371fvqb3ytn6fiuipwrevx5lriz9uy06yy0kqc6e6y7dl8kc7g98kef4vuk9vc6ux9g3gomc8z15gyqy9vl9y9hto508a5umaaifw4wt29kkpi77xsn94fwn6i1ejisidao3gdaxxs65ien97vk0g94f0kp404lxptfmahzby3k2datf46yt4szhd9awrbcapd5eak7g0f2drvycspesh5i4sw6xa0stobe5h3h8qta89rtpk93tpkbeoot9svkyd1swdi1ewqaysue51p6u6njscjguo3k8oxt9kzvhchqa2itwka3udr8ykasc4qnk88x6xjdghdmd5wuwr563d26is69q7j0wvmu19lh12yb507g293fxiocwhhtftktl2th2hntpi7kunts2s6x34k56yyskwbwutnj4ds6dzx29kevc4ztkdhm1s7ykzf40g3fzqnm3rg18ob3yohfss6wf5bjyn3h4wetsdgzx31hvwdfgy8vfcmjbelyg4hiwjxwwrcleazjntwuwu6sj0vvh5bwjo93edrto7sbvvwcbimphh8qr8jq4ohuloukpg3hpvzm1qjb156ykyh8brt6d9a0j4mm1k6oxx0z8ggiulu1rdb4z6wikamuj10w743byhz3fy6hiu3q94r9wmdusg06s3z42d92rhhyq99uhg23t0qfdcf71slhdtrmuy6uzpkjwk265nit1k87foymlq3d2i9n6xg0obja3by1887kub8x1r42d0p7yvcthg700tndg0mmw81wjrhi4yxqi5z88sfngwa2zb1ttmx6qhqw143quz9ddiyovghif3lwhprim3d6deibidnhru2ph9pon0e5655tue45tslssp3r85s2m99ws803fn5emh2427klb3335t5c2zu6hyz1c1kowczgpsgu30zy7xjy9bar1tnciafz3vji08fffqncvm7zsdnlvrp6bgbcld64771avx4zbbz39vkuvdi433vaxe0ww2jga0vmi7jbycch7oajss61xre5550hdx3k6pg97vwuikdtbln74ri5s0uzq8j1pd2ke6uozats841dsa18n1sae0io2w6rsymp2cizm9nie4uk4qjnti8d3z3wi602ov8ab43iihsh3cc9gtg09d8whkxnqtobw4wnw065oemyk9oxiktmqn0ytopd01qk3lfwr8xonl4sr4u78q5j5ypbswz7iex4onyvroykr83ad76o6t5k7vs1urihdscr0roll5vdfexp0mmoktmylwcla18m2bktz39ac2r9sj16cc08sl2fgr39oyv57n3lx3u4gzqk7hdufyavz9vzgxtlu8skclr72ckatr3s8644w8y69cwsp575chsb74broopoz4h0la1lhooewjnfzu1jxk890linitmnowpjm67915wi1cd7tg4b0g0atavzvdgdd75q00swllzod8031q4hsj8pwusoxncuznla0deirpa2x7jdi0y1j159jvck2z73opjpnx8ld075qkpctzamasg3a0df8y5tc7vbzun89ooo7c2ht99h5qez1y3hzhdyxjf13kv683nhixpora3dr2ujf9nyo36gj5vknj7ycrdehbo7vrjdu9khzfozquj0r2mdbdcw29c0uica33mb0qv2de3043vaj8ophmmet6od6rpfc5aj67t3mt2693pz1xbajjuza0vnno1s2gxscbn8jdaylqem187t71ava3th7st154c5dzzl4s2pk9fnextyenwyx3g2epduginau1jvigssaxeipndxhh1wctgaavis6e91fez',
                redirect: 'o6yedbnt77zdzzswv9gyljxldan6xzumz6rsfiih2tkhxb4rxmarcmd4rhhklyuyyb9dy5ceqbq6pyzrgljtuunbslagzf098u7j5z25u7oksor74jx5rwqvpavsv069o850oy9si96zfpssned2tcfn9n955m3ho0xb9kdvgvjzayzikwaj5mvhd4o3s7hhdpm7ki80airjr42piyeyd0ltg4xxr6cmp38ageo36ceafb0cbw0u2imqmvzitgmzdrpfuilnof7znd1pkpmqnb9blls36hzsz1xovgavdj8clmc73kmi7k5f8rtkpt714abtaqutyt09m19k24p8lgoperhqilwni3l247ba9k0tu3m4xjgnodzayxkbeez628i8cpnd0xdm2r5akexqsu4xf6lmvbxmrrp8oobhks2vbjsjucy03ojv2kx44y5o1ga76u16nj8afre28p4o6c7w8x3o36ceudmtvnin2aykz30wg4k5vpmricn7zbee7ci62uc7go94gpfw2o0zrvkyf9wzw2b3tz8j0d1vadrnvkb98ozszt6alybc0oc4n86uqrzu54iuae34ur8swfjbuwx2vibms39m3l7bkyuscveo0mf7zo8knqr5jmj2xuye1z39exya0tliow5pyhzntqy12rnhgl95kcbtlq9b4uj4ncohjlelftheaw0yfdid1v78j1blsw7nb4s6ehs9745mp0ne1o93rrf3fzmtfh2ri2hc4sxoniqkkwtcmzc52i1oynrqojsveordoo7xcmfnahyx9nti1fr0fc2bijlf2kat1svs9kosjumask9s4hzjlmrr4thdxvxe8va35p50lo81v7hcantuyla299ppcqpwtl93xhco1anxh56ntxwr0ix3yvkuin34rs3ttbb8ozmwieb0a1f7hz5l7ksop101mqvmeuqr7psvru4ueasyb7dafqpmdclih1cgade51duobiblpawqw6hkiylfnpnr9wylzgm2vrx86ht847fa2fcnjyoptnosesser8xldkyn5mwfv5klaswhq2m5h4newpvcdkqvarppmus2zmmnps0y6hzynmrnr9s9lsdpc11rsru6n2c1dxg5tebl1l7dgbmzpy49buaqvehbi3t60y08ahrdpozbx8ndq3kxfq4i7rvgcn97l03yonah3meq3h117sxjqn1qvytpkwu6akdakffv0691iimxfyskrbsx7dzpv6axhtx5ft4y32o5buzboq9obj5fuu91joyynuy4cq5t6ctaf30ymg7d3yow5sgo75wp7066zp9kb57kzgjc2wbcpviivymzc2l14uy4ootf3iq87yzkbfkhx8vf2jq9ke4810f00bo0dvn97z0e7nv5bz9wkkcav4rypxw2umrq1yq6j8kgptugpvip948bb4jjoh3k1lxftbur50xq01a8wm6xfwwfpp1mklv8hziwd5hovslouxltozlof4ak1m590779yzp9mfzm7zstg1oojbz49ezae9p2r71lodjr6k5jjp536ntow7hv7sw0s9tthco4ykl3bb7p5dosgmrfu12ieql9a9xo6jul5xd84z6di1h4m6nk60aofen4tuv5mgxlq05krwk1tpxrx5ly8dsqh1ra1u5zopfolgef1ha9b28ksgnrob0u18fg41czn0gvr8zk4ttemp5flx1b24i7argzlo0o6zlep9331z8isiljthcsbuh5aki5rjrksyqixlyam8xpqfojw5dspguyr1mahvcq8cr0q72mbawh9wug70m6rf7c3ucaiqae9me0cpv08wjq6prna8vkv9ykjt5flv40jusv8v5zznhx9e21takkqf21aszv1gq50l6ivrmiexrzd2g1n1hmkyg9bniijr70ffq470dz36itxn9meqjekb0piwar62z3kbrgco0nbgvg75vdlr9oojgxa84w8gr87b7fm1yt7aj3p0m1r0cj4sr2lm90xvn3wwuy0g5m933og3cuxzol5u4',
                expiredAccessToken: 337882480,
                expiredRefreshToken: 869645135,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE o-auth/client/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/delete/1e56dd7f-918b-47bf-bfcd-f9530bdb5383')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test('/REST:DELETE o-auth/client/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test('/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL oAuthPaginateClients', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthPaginateClients).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'applicationIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetClients', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthCreateClient', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'Small Fresh Hat',
                        secret: 'gxfzae0fk54y4ck6vd4ou8jpqp2yvds9evp1uy26o2o2ihj0upcriwub57newwlstz90jpiz5c3gyaw8rz1qqx4r2',
                        authUrl: 'lk1858dqcvzy86i3ta1bre924azln6w69qh04i09xevfdauwltet2jj29vt62or4f5uuy7ir9h889jlqdtt3kt7o6rr67xli7l0ut7su8454ry8q3w0jll93pdtyprrymnd1ye7yaua3d8u60gdaefm5a4c3ouznxegm5bnagwfnjlf9gm1yu1dkkfhyjp6izuwt15xkd6gq94281oy576h7ukodsvk2riqbshz8t0fag7ipwcdfyp60c6uq71xjlhqzrxbah1mkoxdqpkr8eswqrsnd35x2mfm1vueafdno76aem71f16sxtpiuzgbzhnt5lqy1doi9km0y111pgyva2fyjtaa4k40ywfqeehaeoad0juwqy1pn44dj2hw5mi5k8q19qcenkz634n61pqdofkx3cvybhc0hnnq290upjw1wv5r8gyv09ah2wft39bjeol9gik6oa6vjwkca6s4zfsyc0nmtltcv41ch2ozj0b4ztjyxanpuruc9y4bhezhiqq33cidgyx7j4ctwz25l51q9hgrh0f5j6lk06qa283hu2hub62hobz60f88px3t1uw0mfcck2uylyr3fx3h5wnm58l8mth1lrnf6eyyax2cnumioutub6aezghtdfkgak6m7xv88tnue8v1gn3qc772m6ixbqpy9ezrc18gzoz1jyvwiqgr4qea391ipw5x7kctg8uiduuxxgkuizt48bi1t6dczuqy02kvrjnk3xst0xseuagcolwi9ovosk56e2tun7s2it75o06okvjdz73a3mu70d9en4obhas6puufw8hwsr06v05kg26x7p07b2cp6i0nksdeb98nhnm5iihqg70xn1k1pmbg0q5l2r0s1hnomforlcgw5p0zzyuqc3kl11tmp778c6gjmiazu9u80ndugo4mw2zg2ri4sep6ncnclvz6rgmk5oi9bnvjunp08aprd8yy7pqk8dmvjw664wuhpo0qzeyrpmrelfqyegoaqfni916zpif39shtho09398k8p707z2anpv7t2mofdf3fjeylu0s3a785ey3skkgdvqqfr1wx9ghujs8pi9bw1cg7sljud28l0jvx7etvhs87p8r65sy40yc3d5uyp9f63ha22xt9dlofrym9w146l9rg8vu8rascfsvva3lr8980ng8ib3rectkv01f2rwd1snv8bojo93y7byxedvvmd4zgf2q4lipmm317jmzhia9x4wmtjykpd6vzei9w7wccdx29nktpmzrw4q6776vellirbc8ny3rcbkh15bg2ds4oe7f4yfin3ng8jy50bt4comrhjcdorpzg66qk2bps0ii5ws0niyhkl62yautkdooy7gcnuytvq4dpjnxboxoejtb8f6woy42xq9kjyeu3wfxfvf2v49u0yyoful6e0u30v8x7xttjwb3mbefj6and163xf3h3pd07stzm019a5yudx6b1ssmqikksgwpdmwfiagjr0dze4a24o1o5wlempj8p5sn2xmlfvjv3q9jseb0654k6f27y7t30jnp6742mbw6vglxylo69hv1g9q7pirl3h2q6dv6w14ly4x2v93140g89gcbo7nwvbg69h5iv13zgarxu4eafapwzd7co1lhliqlg99g1f6qy3sts757eyyjehu42o6i2l3v421cbupo0956qmtrfebl6zs9gtygzjjpirxz1a99dvswg9y9k2kh2ucggftq5cp8xd8k54csbtgm9xvhmi8z22zr9dftihgcwaksz43j3i4txl5xftcmgwxpaue87eu7qb5ql5pq7erwlxt2h4iu22k9lrubiwn96dyxbb5ltshymwgpuvqbhfok932wtf80vnxb7mnhueiz0xu9v23s793phrmavc47lth3o76hb1cd8cqymjj2gcm5doz1hlwv1r01zes1otiyr1xzpkebykksgie482yntpd0yjawt2a63rql38r4mm2xrpdl6i2bqbu344fsroqnxfores5sy4qdja4t71li2ipp',
                        redirect: '5n7lebkmseaj3d7b9njy25cnsybhwoh9tly9cx0bzhe4bfcbllqqwfuadwot85n5xl6hrtyyykc5d0wr7fihdkywtxswahgil9jp9csoyva8pss0qe04igsw5hjvov1b10gyelem091k1sjvmdqsclx8sjoysno6kyewomuudlt1usz4lkwkhsvpy21w86f66ylgtvugfwht4lei8fstsgug8ib8c6fpzvmqufufhys894wxak2wx4cp8tcv2t94nr8o4ss93lcb5t0byj1h6vmfqghev35tqnpafuju9sjsugsmbq4y1e1kx8xubs34makkx06sxmnuwsc8jmjms68gz1k296r1qjjjew5blcmjem0cup8kuvtgpcgi1xanuki6jwqs64o5lgo2vdr0beneq90xba8tfnnhg989ob44offw0ulilrkagt49b9vahnsvj8j7j7p9uz60hwygljxieqpmhkwkoj5co9c02v6r24irdnkvbticc8frwuv3vmzodr72oxx9fgravd1mzfho5l0u0k8vnqa29vbpdm4pblpwb1tutbdolehgkluuy4c1srklfl3pcnfbli48ykpq97vn9lnkw39i2x17icsqqdh7jbr474ztws7kqjyim70xiio76facvq94q88kzwewkphghbf8h1l2bgbm33uowvzc5e52ronfpem2cvx7hmzoz9xo2buss150h4qqc0t8nfkcbi80pfa1buhd52wei2r0zmt7jpdre04zgwuvfja0l4rbtquwpc1jws5phwbhucxs027fvstopzlsgvc5sw9tqxsce95sr3cj1cij4g9er1je3gmkj3yli7ow6y0lm88zv2a8mz9ntfnt4ohy9be2uwdecn2rf466tbl2veosrs08uom7u7lj4uqcauz2go2f99a6tgxb9n17xpgfsz8jphswr82jdfj6nt3wdn2h5h1zsja9y5egnc323wwyh6741w30m4ae2lcsh9nc8lqvmkseqn86klo96kcge5iaz07nofjajx7hc78qiug6p87lzom0eioqli33d0r3r0sdel3dcpkoj1svjvvxsixa0noc6j4ai4oujj91fyqrh1lucw7sloapncyrbnbyo4v5k7188yi3dzmksrt56dn9vr6tonq4cmc3vtj8ciinagtk0cbddylzvt9rk4jra77h5rsigeha0ogkwnb7wqi91fs5kfqjcxsq40k7z078ugonb0xufm1b9bgfhf7csce3bp0f8g98jgf3q9a7qvc90nz0gc8imv0ko2y2qidf9kq4zykoloufoh0eqwvm7qx82efq6pvvuxi3en3j79y5juph6lx14boylggefjvtr0okljrrmv4bgypccy6wlzi241x3ee7immu1xvfk8ucn27cwimgmuksvm8s18xno7wu11kspy15vibrqezdw4k5ovt1ji2vzngk2w56kjn4slckq91npluwduztreo9dnlbgr6dps1t4u3ehqvrxlhaodw00t1krv2d5rkp3jvvgospf0301z4pxv444980jts9dqgnl51oxqs4c7e2tr2xihg9so3qsk22rbtc9tnwwm5blncqa7ecwmnklfnhpormmuxlgz2ci7tsaj7sy915x7pbm1qsrn56s2o7dalcjdtsm5pn314gn41c41x3630mmzm4odjqqmta1ert102vvmjyqejcz6srdajcekyvm76o63a2yi8bgsgmz6p6g693fiwbj7g5r5xp1bxq0bg5ub8m60gnqdfd1p6ft41rryj2t5eagokx25c6x4czs7uj6hemut979tllhdkm48kinityshj9mfy8226wu741qaj7cq8eauq5a63g4xo4zafkl1vnsig9y36bksk4xp052kxwe1wtis6elnfu8n8zat4e7eii8lefhext8ktz59r36s5n6iumniz9xg7nopg3vtbhgv8zhwivbu7sg5ac8mva0ftp41b5mekkuh6mz0nveyua9bf37jefgup5cwepc8fgjpfli61yh3p7',
                        expiredAccessToken: 912778894,
                        expiredRefreshToken: 489356772,
                        isActive: false,
                        isMaster: true,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindClient - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'ae2fa2c8-dbd5-41e2-bc2c-17df11f92f40',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthFindClient', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindClientById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6d9d7c6a-55cb-4560-8dd5-20381a8cd943',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthFindClientById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateClient - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: '6c38768f-878e-43fc-9d2c-d28d1271fec9' },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthUpdateClient', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'Generic Plastic Fish',
                        secret: 'y8i1g779toltyt3uugmwl7f71sdvydnm0yqz4lk3len1ay9qdz3dgsti0tkp68n5325061l4j7p876oa0w9k6ec36',
                        authUrl: 'b53gqquj654fqaboq06jamnqeaj7i1ex2q6spppqq1wgogk6giipucbqw4d2ai27pm8pf3edmqvq3vha98l68ajpzdbnq1rbtxntwedrkj4obobokiq3r89aflpm48fpf650x3gi1ksgh4vbtqqigiyvmvonl2b493k91t41cr0gq7dhjf502kluw63vvg2vsgmcksl7dn6n7sp2pqusbqx7hvww39z8x03cl4nvwkv9vy5b4glc0wzbu6ssam2vakq81gsb3dymyyej9cz1w8gcfc4qdmjax0nvuvthw66d1ag4ptowuiu53oqif3u75y2syjidxsguu4hry2ei7btqxzl3pcb9ixjd0yvn471j2a76aaetd5sirdtj89xin6f1t23bjoi2ara7lmgtz9qncwh6kgflj81u7dnz9ekfeaafrap7zoe68frcos4cnoqmnzqphe061s1olvk13ysc6k2t1kickgmei89vot1oye21zgi304abp5rs41ux0400q5wvnh14i5io77nmvft5h6q3bzad2t2p6py2trkq6qvxb0321uq2hvig9yfhgiadtu97it4byhv3l9soabf5w06bai93fqtj1c1kl08r4ltn7y1b1orn7mupiqxymsh24nw8h7twahzwizg8lcsm7v0dslnm8my95n0hs057lzmue2vu1ra11uk1tl4c7xv81ejd7ugwbkl0cvxtgwrf1yr182q7hrda0wudld5a4yejj91x98fwinc667jr9qm6subfg596n797wmgp3g05cdce4kpp5yzmzppz26jkbu3cnvgi6t71bca488wj6th1lqs7glwbjxbiyp7s6757azwzgk1rz3iocb12oh8tl5rkqrv0ain832grwwz2xkheymvgnj9c0nzh3l1al6qok69jk2q1mx1f16g3evgv4tpqhm2kjr2wiz75xsjwefcsha5haij7rn2q7ktxjhpojyw6f6jty7zdp8ndq4kcth64d9156d3is5kecr3wdd3b4wb1ig6soh4urfyw11ww7c7q7ty4xf82yidgpg24tlzy3a43h98zz6dese4xaoztdxduy59rl5ydpqyri2fepizfu06leut65xz8gfmbcekq9hc0i57iozxm4h7dw79e6xbes8j0blo8z9xzvzg0ku4p7rogt0w3wnhhmcg7kqf45ci4qtoq9wrtuq4oxx5foa4svcqa5ir48s39x45kwhn5i0opc0ckgb99n5qyoegad5bajq6xgf25409w8iyhoheqzxwasjuo0akd8ssi1pqgwsche4odtjreerga2dekgx2hi96wcqun7dnmw8c4kmt7tbq9l9o6jmfsbmg1h9m5aeoqvcixzegdyf4q1r6tjctwkubfqdxbizbk9a39eptjrf2yt0gyu15kpjsc68v6l5n4bb9qcu6mmw5qp6fcviz17gguao4ixq3tqytvyarq8pjvdhhxmsl4w4252h6ep1kfw4pwztydfkeso0gwy2w0vckwfci2be8y27eo3ywvd8733ozzwoztz6k06k41fu7fck4dagyl4uhrhppfv6c1ioj5r9gvlw0ikdypxa5bk02ao2bcwyizeq2r2dyl1c8jiuzbpykj9ovlieam8lsl3z09u0nt6epe682jdjwy5wwhx39el79jz90qgtmy4nyuqs1406vo12tgmy160jmznpdkuo7rw26h5mq5v0h07u0d1hnqba9qb1cv2dlyd9ozylzvtmyb4xq2f2zin7ukai6bgo8muwdelgqkefeh8guer1ya7ulcb8o2wdndygjcfxoz2v4po30bo7sm7gbmmq7babc7keorwh1yds0ep76jb5fz6nn0sgnzjpstsindei8wfgb4m7wr1vwwwo5e0z68qivyso0enn9uxo1dldfdubmnncct7ugz7vfmergzwn57y55xkkjeun8nau60p9ol38snx4qlf1tbnix5800pmc5coar7iaw8v9ej5r8xj64d4c4w7jdpa5y9tyxdum74s06ak86',
                        redirect: 'oljg80xyfhjep530pa75ek8cq7k35es6zpgzo5bu1dkctv6tc325js5wdglnw82mxq7akmbsdyjlw0wtwr5qm58rknvk8fpcibgm416yd4bmmryux4ewuxpnrgfiighxyswwkxlh7y8u51co9m7porwnymhohqbpjf9ppnr5alnz33md8dwk0vb8ald5npllctplvkw2u1g53u1ts9pk1yah339epl05b9e34g2a268a00ybfz0z7t4t6xl841zaz00h3r0f0ckenys32ch87vtdicaxa627nmsjl3rqlbxfdy9qmdhyaxx4rzgs7ihcnqpkxgi8v1y39fosvtdblyhjl13e3pmnxuqij8rzkmau976kxeivzxvvi43rbm05128pvu1cud6o35at2i096uypr77znrmn0h5rq6709s96vcy41e9dqn5n0r9kjxfi3yso6d1ao0lf6qmt345ychv1dgzpw2z73qxn1ioigkonbtrllssvxrv18j83ucyk8ib6tlqzked4jevhrlso84o521gtqifs1q2w0sk4g5awjw2grjwkwf0mf77kxzn5au6kgqaoj69l1b9bkodxat3e76johhts2cosk1wlaz34dbimrf6w1rui30exrdjtwdofrorvdf8s5wvfyx0xytvbjqoi6ydwjvkiycqws0ee6l41wq102fqh76801dr3lghjdykkfncuf0u5wtisqv505y03l829dvitbqibuyytoulpgi8jw0mxcurxfe1x1jya8ht452ckf1na1luqu70jij8uwrg84ljnjp4ndzj1cmlpi1dacnbi9o0rv960zg2m9fixymiehg12iqkhppbjefqmlsjlstw6xsjh77jni8un5g63bbb2nj17pvqlnwa2noddqtmy3aijo19ay74hp62lm50dm1294clbc50ynubel7s3se9rb3lrd0me3y6wd1ta4fh9fz8yerl7pyejw9mto7cb27qkgpx9x3uvuujfc94ofzw2crf662s5ywpyzwoek3ujo3tkb6gx5zu75wmd060qgbtyxo9q5vtbrj4y700i4sd4m71wnjtus5v222ch2r8haynqvmhyxliib4xj1m7kezcg09vb3kwysp64uzka62p63e7k55j6gsbrb5tu2fp81dszlrijhdqp9kb4a1rxzddvnaac0uin6jdnzmnfix3bbi76hux3x00eud5236aynstem28xku5rt8oanqy05hi8jjwhhyklyumn7mb0e57ggxut5fg2k13q51z3jmblgi2raiw03o2norkkv907q9tma2hy4t3blq9551ix2jl7ienycsvqqgn71z4auntxw2lgb5ty65h7o287agxlfddw7ghw0pz5kwuq71hblx1qu5j7sslt91aococcm4owpewkmdb4k1r5n6mzn26n99olz59yb4pxzvj9hd8gkjxh6d9fvl0c7dktfm92jh9rrtlt0dq4kvf5ftlg063tx9zl6v7ixyug3kkyhdtcl78v0oeol2eqai6imsn526bffvwcg2ii3cp5syhhk5y2wy1ebsjhmmqmqe9sfkkwhfxxnmbybgcsxy1xfh16bz9k3z2yixf5lmqj951e4vc8rli92kbg3g4ns4mw2wua2nx316hvg8zvpk9n0u6cvtiqx899zdm288slbebh1iqncv4krufdt37wpncphlmdjh7zat1n2gjtxsdok2dkd4mindtkh0nhz42ut8n4z55w0yzkpwjrb8pw8bgf2u82enuzlrnpc7mbk243srcqw5cf56mjvu15x97whn8lh3mq5fmfkgwng37hm83xpzjihywsatjexsljdkk95iklif6iy0vcx0paeotxi3afls2tmd4y6n98b27o2d8wpzt696bq5fh6cc27jqtkc16zsz40gky0srqj9kfexj04q2t6iequyjz4s761ejvcnua3l942okua1xpacve2jb99311jntz9yi2bkgnxp7xe9ysnuqw7yn5qmtmxmfi61ntvtoj0mqb5xxg',
                        expiredAccessToken: 595047614,
                        expiredRefreshToken: 958283200,
                        isActive: false,
                        isMaster: false,
                        applicationIds: [],
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthDeleteClientById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0f58afd9-2e12-4d95-a84f-da2c7196d011',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthDeleteClientById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await repository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});