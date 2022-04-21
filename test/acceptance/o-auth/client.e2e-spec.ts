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
import { OAuthClientGrantType } from '../../../src/graphql';
import * as request from 'supertest';
import * as _ from 'lodash';



// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let repository: IClientRepository;
    let seeder: MockClientSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                OAuthModule,
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
                MockClientSeeder,
            ],
        })
            .compile();

        mockData        = clients;
        app             = module.createNestApplication();
        repository      = module.get<IClientRepository>(IClientRepository);
        seeder          = module.get<MockClientSeeder>(MockClientSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/client/create - Got 400 Conflict, ClientId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/client/create')
            .set('Accept', 'application/json')
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
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/clients/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/clients/paginate')
            .set('Accept', 'application/json')
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
            .send({
                query:
                {
                    where:
                    {
                        id: '7672eda2-b42e-403c-81d8-81d92dc130ef',
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
            .get('/o-auth/client/find/7429aea2-ebbf-439b-b122-53feb7bf1098')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/client/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
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
            .send({
                ...mockData[0],
                ...{ id: '86a905c1-2beb-430c-90de-ee556ae1c5f3' },
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/client/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/client/update')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                grantType: OAuthClientGrantType.AUTHORIZATION_CODE,
                name: 'Rustic Soft Sausages',
                secret: 'g1foprbju35k8qp5z1wyk48151o4jvnb1byjc6nv9np7ih34hthm5wbbb70c2i912fhbnncnxjayv556tzzt32hk2',
                authUrl: 'wujs6kfnr7w40ej6i19bb02ijfv1dwl195esn51pq0u4pe8rnu20wy04geghwhey4poao4hhnrn54y1y9m9nyn7mgf6kwsyj91fpf31nj4adn0ajirqgcmcwohg8zvusiqccw8q0pzwx2ac7sv0jni3m0gs105rcwgayfcp7tdwy45kdwt3zhnazxuyvy60sjf2lioy0083654g7z1icvjyl4eg26kywa0nj06hwk639gk4zqgcahv9vrp02u74g6ay4gbbnj94112y6jzroc0kin0k6fshohxxpyt4q49evy0xea6v7trr0ftvcrnhgrjdnvws9z720flwcitcdv46vrr1bcputxk3360if3f9jtufhvfip9y7g55xfkl095u5m6oij6smx5lghugcbsais8ot449l9v2kehxqy42l5kb5obyvy9iymudogzvxyw2auoelc7f7qn73s0z5bsrhdstobx5kqw1qmkpwy7bkevtkn0kk6s2oj3ahkwcs64eiqn1wuv99s67i1c3nsfwblkighluu0e7wa9ndzob96vioao6qabtn5popvsep4iv6663mzfaelsn1n07iej865vojdghbwo8wrtvhdcrllzyr288k0chbk2t7n2sakjhtypao8h0cy9ezz1w2nclt9l516ky8vxpkya9x8goffy6p141tjkytqr1fcpkoaykrjfk2mmzez9xjwlu0m5u35fxpx7mh8s7kj6nzczt7mh9h4vwo0igkn77ti2na58te08xtvrhj3ihamuecyg16lqf6qi6yvoc34gdvpz9x5u08kcpwkj067uagnkj6cx81egorxhfu3a7efyru67qbhyd201tj0j7vqx2gc3yivitu3zkytdpaad7uqtd18gxrzq4bvkn2l1soqfhql8lanhq0ryd2gil6pzy9pefmramd3xy1qe78wk7aoej5w3ty0x552m0p88fiapjxyaiycwzw8761vp3z6211rnsw11fdwb3k4heoahvr6z99p4csee8no8dmtysk0pu0evnwd9at8dlyv6m56wxgjexwl96s4u6z9gidnrnxwb9u6lsuu030hrxt3edydls8vhb2tm7aux47j6hku9ssbuuv4tzceol2ya8p2ruhd946gop8d6l5bc7mml2f7ckyume3n2r38te6beid46pa1db7jm7z3oz99qo75o6rp7dw1p2g0mqm8arpcrjh4nrrjt4blhzr88l20i5hxtfv9hh0pgp5bp4pjp6xqbcmbec56xl5b8rwogylw5yg0j41usaqjwipieyl604w1gn6pv9sb841fuijx1oq2cu47bro20ra1cs5qzs9g6mrxzagq1sh4kfbmm2b3ufol2tqmluqpz66eb3ex9xxlm17l8fyzahoxk4rrb38ehdmt5marq266exayjasb20jm1va0q3onshhnf8z2ds5mwi9n2kspylubolqxp4xuudg4a3p1hmyjp56ltqza8g7bgt9h0ix5rkzf5fq38ltegyor1ljo9c7bfpjs1hmit5iou1zwsvg46yi6vav1kye9168s3izglnm9dlswl0vvhzf10730f52dv8ao4phq5v4cj4qf357pcxxtmp0yze69mxeu0gbwscluv1utu99u0tnocbhuoqaenkztxjdal6un7mn0bgf47922ut3g3k68cy1ns1nbj1umsuyvwvhxxo2c72loj3bghd2vrkvbcnfp33hrkq6lymukxw3hkb3mrkulush5g4swv4ibhg22s0ebaetaid2y4zbpd5gzy8zmzq3ne3jsam9b6pzo3jgl7vgcza3tvzkkdwv83h0iepo8z4pyz2avbx5ofrpccii6kex65276loan0kjomxs2h6zwe0j9eyztajmxu0da8a7y1is3tcm3u6q67rzskjcjp1xd2nrizpla05qlptqhnj3sa6tmeqvp3uyz7022stw5s2qyxhzzp2i41fydnu2mjdfnru9xnqo3jp0eginhveshau3epc2dmiqhg7fjwopd42l',
                redirect: 'ndihmx0e7joansz4lc8c5x6kfcjo9atjjn9p82hb482d0503mwwmzfxqeugam38456v0p80zp2g1su32qm5u5vxq79sp3u009bf6r4iek0aniwgo4zq0l9vmrjkyrvb2f32od6zi5yp7na2uvwtrkvyrewem94s4xryi5a1z7s4a6qgedlqb5rqjkftpq7cyj0o06amphpoexci4ivh3qy10602qbawx1s5x35dmvg40q5df71hftk3qrgkdffbj7t0nluufwbnfc8tgatfo6gdwkoatbu2n5yi8sp7x6dqo34e40net1189dstuc7gg3ogtxe4s4fjtwgj7h614nn974u6t9rltlrzn8u9pwy91hiiy9pyqz84m9cnggxfjhd73c016ffjg9rokklzzuciff2144uk936fdueyhne6ev8flddtoucctujf15nwg7cc8w8t9t39tm0hyx03qq9xeuxlyr7gsoovckdik991zdhhw5vbe5ca01e1ehe9xfwrsy5c0fjrrv33pxczh8kkyavcgilzt6qp8r6waxa6aukv3y2hy1ilb1xr5sgk22lfgu9kvh54qyg4o4kvjpi89dm35wwez6j0mrbl259h5ltc7q9kbd5okinsh3g90veu8odo3snm68cdf4lljdi4t5ej7zv6d2mrda1si2yrdyuseo555aqgrnwahwtpstosdl6milzno42l3c2649h96f3gkud6d1vv6s6paa0a6bj0hnbafrixvcazuky62u3b9rm3d1ci83s5gkmzryhlwdygczq996id6neuju6ds3t9ybbl5rce5th9nlar6hz4bljjcwfx1lwh67rqgoo37dmz72ikby24imqt940zrkzn0sf6ov7kobk834rvgiyajz8yp75x1al4cket3u3cbxc861b72w7zai81btgse8q7ebac9enghlyfp3i1lhjoqp0lubneudgj4reu7a29rcrk3agf5tqqvkvid96w48phinainxozmk0ry8zv17eily9ikjkvsy7egafh7rxtlgyx4nlcjwlab8x75972o8oy4kmb706ccjip6uceedd7mb3sehqmty6cs6ut2uvt98uiq2k7k06mhp4ud1lmxu2lvfn17tptdvagvrorf68dt206z2bbojj98bp6vti8gmjl14sv6i0sgqsgcagipx5waak5jqxbqfqlobc305yngqaf6h8j24f4l3w26wd6gvgqa6pe0r4dqn94itmz0l5effmec4uig2l17knhjljatuox6gk4jg3uuzln75x3si8vi4qgxrltxeo0jzwl4zy6v0s1v25jluev8zd83o1ms9n12lm10xsqnfifgixiocux1x6tm4il2u89z2d457wpkyfwwfo1atnsm9kloaptuc18j6o14b2g4zmn1nvt86u8pqinh38fxzkckif0mgaa8jm2rbxk3a3h89nbuvopxitxylmmncc7t5kqve3ek61bve41lmp8aae7ruwpqts6ekx1ylndi0z5jcq2slvz3k0sk9kwdzi3ol6ufjdk4icbxworfalvpjrdx3xg8mignzusfo7ai4pvmqpnj5jve46vvv4hbgpv35pi8ypcby3met182ife3cnaf2cbc8yoezn5ppw5gl7iag4znwlg02k4rvj2swwfe9qb8s9heqac2ukhwtxj8voibjvfifyqh4yn9hhfsnf7qh7lgg9fdevcucqsjqdme78u3gv8rfxiyjz20n1cumipftcs5xawzjbtpotxofratv90x8n248zhz4sx93i0qo66zsbvy8cu0lu7zqlbn8q6xxjf6n1qtiixp03urp13vbqf2p6vpr8440hro7s7v0z5a215blb6mrr9pblaksraraked0sgqulg6mcs8h15lxdw0vlu0ndsfk5oibcsqg7c94siilrof2cxo37kejd8v4q2zqtxv0lfnqi40ycx8u434nnmbt01oqp4lj4wourg90zyhf4meezxv5pmss2n9gdzre7789yh0k9n3vn415cf',
                expiredAccessToken: 502089627,
                expiredRefreshToken: 137000982,
                isActive: true,
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
            .delete('/o-auth/client/delete/a982d6d8-d47b-4e32-aa9d-94095158bed3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/client/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        grantType: OAuthClientGrantType.AUTHORIZATION_CODE,
                        name: 'Unbranded Plastic Chicken',
                        secret: 'xrpej762m2uev1yemw4gbgtrkqfm61pxfd8gm89jaygezylz7qr6etuls8tzwni1xm2o2j27nrmp74nmilo8vwouu',
                        authUrl: 'ga94e6eddvczlxpsraesayomamlbjxqjlhmhmjewjdwk4ryfy4kmzbn70jir8tmsionbu14pqvbk08izx8dupdcxskdyol5yzxu6p4xynrcoppl74799qs62tmra8r99rcxr790wm4vi2a8smyp37mzx74ah2qpioq65s9ici0r4pnwzzcaffvx3ltn521zgb8pj62jgwbw1jhbvct575kgztbr2yhgsnsbv3lo531lp1fy66ekkktbkx0qbu6gwsgay5hm8ca3nphg08m958qh9bsfjyevs0mvxn3u5j9ysztlpixoaftj7im8gl244r8scb063bw92e2wtgq51w8nx5q3kjkp4fqk4gufpqnnks4yie0heg6y2n9q1ckuam9lrhnvlvvbl0a8g01mmbr819v5axzjbp1fxzwo7kch0yz939olode14bquul1p4or7w6f48zxyl31ofc68l0zwhv0lem4ljuh8336nwc7a1kxap5jyq6iok23vs4spogjw5dt8tck7357n2nz0gpeh4lo56cw4dtr2hb43czflcxcg97a36t05n8ty7g1arng83skmvbeblljzulvhncf8nnifxaljx38nou0w952kog15qpwfdn2l00ojcum64vnnn7rnhudusemeskrnqji64tuqjq5bdxrtsu6ooj72tqorcqb6r5k0wl77tvv5uwoh1szkd8ede5v4mu3rxd11q9l8pxah3y1mlfiw9hacs9r34ply36asu5k2h2lmw2ubzcxxgcb5dlzgvdn6xrdm1pay9tt565b6njhk87mem6xbi143u17owjn1hh96rs23n4h3a25z4csk0364b69rw6q248dlupug2vpjcbjxifzzc0d6robmh9s861v7pia9yolygnc9mqkc7s7lra1mog9vi1f3yk3yw24kcmkqu09pbyw331z9neaml91w48lexx1s7pagi9yh2ebhmyp8j3o4591xv3mxzhs8xyvehyi3wos9268q0wnyzpo7jl7stbfh28tr11vnayon1dw5z1bf9x7j58o76fsw2m40iohdwv6tex9ldy5n9fvc7mngsqwu1xq7xdkkmsp97e0sjj2y6i2qbccaey8kbvbm7pt8c508ldmflgqigjhs3hs6ob7vx5gk2msy5aa7pcr6tfmom4912tu74vvj4udz0amtof8uj1xs7f7la53q1wat7iaqwbuenqx26213e8c7ngtkynuitwr94gra9pta9tqjort8lju9dpc9qywe6limnehep00jc3v1x51h21cp02ofd4ahcikrbei2u6aovgrc1sihoujsewe82f48ujgo467ktt4xdy8yox29zosmfx7mv90o5ll539s9y5v5s0fi9634f4z52nfrgtkikw3pe755x3756mn0xucmay8qhrt2hb319atqphzrm5cdec6eaq4mnzjq4uco1sj2uyitgq3b78u56nxkm7yvjaywm09nm8tdqzmvaar4f2fjvvcsdhcwkon1kf5afall74nwjkl8b3z3badghin9iqvqfgtesc57t37z03zc1y2rhkpg4lilqhns3cccijwzzfg0c1t6y8ayuqm0vmz0bov8vqsdgoa2amy0xips13jsd6nm8wuer2ncodfzsqe2d7ppeqo078bmtffjlk0uifkvx8ec5n3lv68fxydrzsllhh37l1etan9ixyzv1i5pd3kckqla2m9ozu0hnvm052nji3mfwiwfyj70o4on9sdo8yq1mo3i3tmifckh3mz4xgrd5s0i8mhqg2jl0sxty8b3vtqmrdhnehzc6g4483lnkps0x5bsrkcb3ear4500grt4cwa4jlz0rr78sb2kurevc6ya4bldh5pjtjbjznrig5wrwdztgm77rbcjm90dtl61emppcjharlqkbhmb3f4o7l8mhb1s39s3v87w9rjttwsn307emzb8ro150ar18ophn38is3m3idwb6dw2ygng5je2xal5oejltcsdbj4cee0silm0yfq4z8t2cx96',
                        redirect: 'tvliyq6uydi8skzht32zv01lsk88g34wbvdspsv5eeahny6iqc0mjhm7o87pgh8nfotk94e39ky81g2wq0km3n3p6t61i3jcorb9q5v3s24ey5a6zhtt4jlp7d2t9d6n6c10z0ztq0ow894e5w9h53ptdzjpvio39ifphca10qnwki1arg30t8qy1t8c4oa49y1lqbho46i5cui45rjiwp8iqozljm367q7i32ijvl55l8pzjlyrpaaznp3nqtx8rd7agj86uqetjfenfgk6rnzrdmq98shsqlwonxt1unmpa62vsnnujdgdvq7pe3vvdk9c1x6i9d764g8b85g74jzx18eqhu5156nezxoa76wbnj589uk3xvk2i7468zkhbesgv6v3ayvij5zaviof10in1bjkwjz4x92yq5e5uy4dt5oas8uvci7ky7yveg15j6vcqzh0bx79g3s1en7xal3sg8n8x3hwkn6wl7kieq1javifsc6vcxxbsl3hqk3ns8sefb86aud8ra763cidz2ibmqjyxrjutyo6m5tcg1q49wylh7lyn26igyi861i1cmfgo9luo7qruqkvyd00rlsfvu64x5duftx64e8mok3w3nsssxhm4agn8exg0xndi14c515w045lvso2rts6briuqevs85on1azg5hndhwns6891jufwo2js4vssenl93q0wv912gbc23bpeeo1c8jcw9cckqojqcckeq0i8u6oxtml167yuik1509f9tpil12yu2o7glscl9ct066fbg5dgehiprvtixmoianjs34py5r2a2zji5b8nfd61uygs2qyayetfuh7t0m1ipijxes4v96psgviric2dch3ldokb67ugr866c5rnaiejxrdm0fhqdeala4g3zjr33ehd6vwxnhmddy089uvzk95slets0wmrtrupyhrekx1j7qzjojqtkxbv71wkv132qzzncyze4g19lo2xi0593lf9jaj2h4vqnol4qab76w1pti8ko1mb3afoaaih3rvdh0gdu7mtok5ssifuut3ug0v78wx8ckf0lvubq52neg2ekyxyr44fo66et30leeeqdjwuxxwfummfopmepoyiqm758vsd5dqevf5hxkvo0zpk8ty22zioo3oppdnzx9a62sdduivvqjlpb91p3i95r5n2ubfzywshn64lwye3sf2e32b46xd3v8rts2gsx4ett6btpsbem6b96uukipxd0caxz9a4t3f6xfdlr7el3grrm96nhkb936okgzg8u2xddduimt0ayg990gc5bib0gosf042jb1mjpg30l82hvshtzjfk46nq08rvf4j6swbrfbac3pdfridgmy9g5yzk3brwq5urxfvqu7r4bnmi4hbdjj78uwc0sp7ysohtigxo4i5msfnf3yiakbvgo907y29h36clxbb898simb4cds2tacxdnr4r9v2b8uz2cd29ibykbji7ncczfex4w1l57ua5vh4n9iz9c0z58es7ov2xx7t5xh0w9mw6mbgwz6onp1oxw7qsxn6jn2q4lr72403u3eguvorzxd2d2amthiqfmoely9qd9qtlh4ndwfjea4ckw2f0043x4l7udgqb21r4xbbvusuupn8p6tffl4onnwocrmbqlc5gt1sr8a30c9hh8pmahvz6kiirvmbs3vkbcgigy7hq4ovy5mnmbygr1c7izmu9bfz9oi6ofv1dai460u9tf08wihectl1yw1sos8aj3wqg95rssaa9xupjawn10pszm8d4wcfxpzggh1bh7x2lh1jk2czaiu5bcnbkdtuxnf3om6jj3y61f6p2y46s659g8lnd3cdrs1xik77lluz44h9zlzy15rlhi7ktkz6hgfmywa5o9ydbx6wrvt2ia2a2urxeyuocwhut7so5us09r2uqcpnsvuqq4q29ebca058lel0pf2gfflptwwxbgm34q7x8voc3l7jjlnt2na6nxzzrplzd6ut1itr4sl53lsq6wl3h4j5j66cwu85',
                        expiredAccessToken: 722299439,
                        expiredRefreshToken: 135635381,
                        isActive: true,
                        isMaster: false,
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
                            id: '7d5339b5-f6f6-4dd7-a3d0-4e20d6e42204',
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
                    id: '9e43c19e-0bea-4695-9eec-57275120d213',
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
                        ...{ id: '3aca5b97-b63b-4a32-a721-fc2ffa4f9446' },
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
                        grantType: OAuthClientGrantType.CLIENT_CREDENTIALS,
                        name: 'Rustic Frozen Towels',
                        secret: 'yi014x9rpcazuzzfwfjlgg6jbv9jy49mgs86zihyp51rlywozpjzi5p33zenxqmfvzp0lk4gi3ubmv0kgxyme8asp',
                        authUrl: 'kkapsfwxpysizt25csjbqeqhyuvwmvblx5tktmlzin7s352q03bl4ip1izemsuq3o38dehia47opwhaxgae6fdbegrzc4i8s0c54xctkvwy9ar7l921yepk17qbcxmktijpvevjuujhsf00dqymsra5a148mw6qfvoly1lvh226ffiti8eyvsleglpyf2bkc477l5ty4lws3giqi6cywf3fleux3aii8gchmywhoylm8ehl08xw2omczca46ry169xc7no32asa2oowwc4nh4ifs1py8efqe5xg621a43h6ojdjvkyki17xvwielzq41qn0unuums8ebblo6nxyg9ji8gigzqcvt8qzdnlyk6qj3m9nc2bo99ny7emty3h97m6m509lnnyios391t9sifcfpfrsiei76yz5xvhv8qeyvoao6jyejg486jfasnmqrxu4jczoazgn8mhjhrto3tbe4r0xqg5g2ev3492jehbt1kbupt182kc8hodc004pkox89uo1fz92uy643tvtgi4dln72q7kdx0437f8ii2wvkkrolsnm6avo4wmlpkyj0s5mc894t6cnhyuf3zglcp77t8dacv5wy3yclbykgy3kho2bfwjwr1z1a0vcnxr1jpj22pzmehf97yplqozonkgotvqjeymvplhysu80h1zvmz7v91xp8lj52pq8l7wnhpmt8cd53qn6j8mo4xq6stuekree9yk1x2xa6j0aq4zrd0ymneof1lfkct93gcn66qxjaxevm7dikpwrefuoxw02r8xt8aolp0sckk1l51321qaqte8776haejfse1xqac1qdsfd60o88rawbq5vi1ympve25vp1j83zj0e7bm0mart26zpaxj5098d1gcg5ye3np96t1qk08quin9afg199sek1zeip66z5tt7yvuexhjjsaxgp5ayibyx1yubn1q16y6fhx4wvc1ouf2oay98r1h61yynlm6kwqf9k8c2e89n8m16opywi9aox1xu6glzejb2nt4f7uc4nx4opwklwnlzcuxukeqbkinw91qh72zdh0kqh0m9afzanj5czeqpak0l7uyd8s2iyt84npxv9f698ius47hjs0z39rwxtaehyj3gqqp7ogg39bccdtpfhqcx2s91qal76dqfp93anu3lys8ltwmspfwve7csvzi6yvydfr4xnc4902o5yfpawhkbr533e7hisbw1tixtcs2owc5diz2opdaf0do7k0oeoo4pefqeprsql93ep0gks063xc1vd8jz6yibsuhnqfv0oyxpdzmq1x2gyyk08xykifqwl7vd7lfo2tck40vrfjcrdspzlenqixr6jvcevbd47g4cg93grnaa42sb06nos9vzptffq9sd75vum9995uumud4sdvora8lng3vxco6v044rmtspgk9rw1amvdwo9xm0bgym04w2296t05vg8d34gv462wu7urr4zmyf0x99z9l70lqjml86kvuafasu3pvpn5f5qefm83n85gohbdz1u28hh6sp94xlcdfeqikuga61dopztpk8heara59pl7n1gsgq70zgouxjnts7i5v59ar848vs806qv9v75zze46atad4fmfoca1l7e1dolltxi9258jvylviemlytlxaofsljgl8i4bwonetp9zfbjd6mpl23bzqjt9ko4971qki8eobd5bto5fs4aadr3r872l8nmn9umcu97akb672foky0gjlmh04uhwimq8xforgcjc28n4jkyv30n6omv0z5cnqz5oo9gs2llkilj02iq9b34bsik5ksx2cxg7ujpvvmeoqapsqbizu8inw7z3y50lvljq1q0e6y2h56b9jhfpj0jfbcjoksbsots3dgzhw7r6iupw5x5epy93zc948o6l50lf7y961xfjiu6j3feudzvhi5it1ebo2qbij7hdfqt3723bz3c5uj55zey1gzrus2dzzbhgcxff9010uk3wju89evjmlmk6a4qkoq1n14oj69f1i2qvkqi',
                        redirect: '4mvyintsuilkxwci60juks5dh84pth8lenhr4cspxiouuwkkzyu5gmow73gcyvck6c2sv8cuenni0ilx3j0g4md8zqjaxrmhiwcizg94kjwx0iwxxjjbmcn78nfdihpm246y8xz5mqcques5ptevieunr7hrur062n4z3qc9ta5x8ka5jl2xdljgvxlzru16guh1nps8hizw4tt85x7udj34vw8pous80qt4nw7tuom655hgsd6bsuvo0491mlflvghyvq11y03xtuelsuxg1cywpfmzjt9dwzgwwgauud9w2cbxnqrvuu8kae9uwedhha62j1nqb8luwa0bbo26go9zpjf0v419751lyriihwyxhe2j53lvht5zc841y9hldn3z4ukzwo1roovgnljza0r6r24m51nm1cmbnlxyn77gwx7906mhmzcpp8j549yco8z08cyf6u7w9tzy0vh0juafegpmh3t3fymijyci1uh4j9l2p37f645wl4utm08q34nnzyz89nmfi9of4epjciaxu6wcghun3o7sba1e5loqsri94cxdym1qzmlnfukd2lyoqdu4w12gvrfhdlpowjbb06748y522drd1fd8msvvgv361hvfcmjt7140z3qbao0vn96wpwi0gxsikmd1a1irdpj0dyj4cnj2y8fb635m0l9yzs26piouhb5ujtgzbuppuzs7g7j3mfpya3j9rk3xgyp0nethmvhanukugpd0w8a28en2bc7xm2gugf9cqfw6m25cic4ecet8f0twej4lcxponu59amo678sfvjxea9mpdum0s64q0kbgdnb8tyiwdkq20yetl99lg3sb4q7r9rn4o8fkcl40nemuuknqemgcqzwh8v2suhxwygxfxmn4ks1qe1fbzh394tpjmm3qld02tq0ecv9vuxjwo1xqckotjinzeocxhsjf42o6lxgbtejxf2fy7kyqlxvdn64fjtn2d1qukp9yd16xwqr17l057jm8lebjgqmggg9dacofi2ko71efwd08sfdlusxwa053g7py5wgs6wqr8c37tf6c5jtm7u25ykbckann1lpenhj4372rfgsstnwqfrga0zw9enj2k91mlaeb52yod1btx3idmkk8yp4sxqz0i5qu9y05zumoudokxauv1gxa9ysu38yy3tc58vomka3efu588y1eublae5lsj6o22g0w6yhyh8aa2cjxttgyehlcmp16lxzux1jvx13at66aooppy19lpvk2k0zq8qxxweixm7fqrl3bci42sbrrdrkopy19a7syv3xcvto5bukxh7hh9bcgiojth90vsarc3141tejpgrove27oqp9wjpdszkst9mqd38xi2qno6bpx87blv6v80rvn2xmm7h1awipdv0x9htqqj0k8hhc1yhfxywq08atpd9jptahybxygyruumn27hypm2zsa85hrg936jkgpzrtemc0r0astfzxkns52gghz6jcg3rd4jq2sebwcilalhmduqcxhkzqqvenobsmicgywrod7d5stz8eyupb1hx2t57g4fgmxb01gycjp1conts8ljdy5bfaav1tbsbctf1pj95y5aup82af16k8u3begsds6j7eejmp49ibeo3ligtvt6jlqm0fr9k1duavb1v9w1w8j1q1u7ds4g2kwv74tj553xl04pk4fkx0hu7cvyn3jlqteqmfq5twohabi8ircin4428upwiq9b0za618zwzkxafw92c6iu5bq766c4tbi912jw6wdn28jjjik2ao5ta963px8fxvbf6rt74hntvgs0pixyktwg1cpj38oj1dhsqm29h2lzb2ci89gcw76q9v1rnrrqxebih93gby66h3e8dygalu5msh11y4ypbhunm4zn9crk0pfv3ry65i2xp8pi9qhrkpf07frxfn0qdsgckxh3skl8e1iac8qtui82iiaktf0v8sfn5175i11bld2tefh286bsg83pvws1oy56yp47uf85odh16lkpntr2beg5k7',
                        expiredAccessToken: 295520517,
                        expiredRefreshToken: 257057463,
                        isActive: true,
                        isMaster: true,
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
                    id: '940737c2-6583-45e4-bee0-c7844e7a066c',
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