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
                        id: 'e9ae5b08-5bfb-4c52-8a7f-ae8c75d52d26',
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
            .get('/o-auth/client/find/4793ec68-3784-4ee7-8faa-5a324f4a2a0f')
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
                ...{ id: '40a158b2-62d9-4c90-b6d3-8dcc810c5ec3' },
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
                name: 'Gorgeous Soft Towels',
                secret: 'jijuf1qfv7320ow8ddqdo8ceaba5011eiszwh7190nv9ixio1e40odqvzcjwp0am8gum8vkr2zm61zhm7zuwoj17z',
                authUrl: 'zbzbvo3wvkriyjpmkkdldcr0cqp96ipg9srr36qnx8wzugfri79bb0bxwza46l7iqbcswryc76fd6erbi9lihe0zw6eyfwm18hsk4uik3fry52ejyikvzpc5gvz7jwelc3ejob2c92hpcz602qy7ae8spib03yfuwvfut1q64r6i7dvgancwdeqbr3afrklxvbl7ge2df3ob0njjnuu1j6kvou3u5442nca074aooufbyecee1ik1fdvm4o9b80rv7dbu84piimiykhgrf17hehvt2owtmww30shnc3dak3e31gsa6tk7rppuucdkfqo3qzx16zheqcy2dddcrpkaodbkamg1b7pqatbcfv4qrb48ydacaydazr5f8408fb1d6c5a1w55cs5tbu1rr3axvu2c1x90y7asvs4tnp19xi2n2eioc2evtkgbe3yxl7pfx108pkd0jtfh8z1l2w5d2gha4difwncwu3buwlix8l911jak1k8c63abh2bwk1bqr6u13ai9ww2hl8yhf4k2s10aybvpzlisq5lq26v9yrqlbap46ecea6svajbieh7a47j4r6d1qo2n8uyvh3hcmaffgex30xp0czlwqzjmz187kulyf7idj3ho8b7t9lr0ivrm8fsedcwaegn61bvhr9px2b2oh1wlrg8hpm15nzzwvhbiewd50ir379vutc2tepg96ob4jf42ieyhm59dbn07vcvgx3ni1k9sx55tr8s6ivs5jhj1augwnxwntlh3knk9j1wtimpw2dcimhp0euo4wby6lk4jt26xv10kbx7y9ni5v7m398xjnx0e7qbixwuoy9tdu0u4r6wvnk93kljljfculk4g1p1lvfrhz6wn7al9j6gij7urlnimif86saizawd2q29rfm11khl6nqfsriqegplpz2ztb6ddthmbj1ns7mdggzc9sdr45z221ng9aptyk31vl01cwusez1vdb8ve0vgehyp2vb3w7aevrhhy4i2due2pr76dt2dqkjc7n2f0hde0unlktcu7srd2ay8kvlhl7is53385ym80d6npdmi8gsi532wt82qpt3dwsucmten29xefpbcdknefsvx83tjfomb76v8gwcte59fhmp0pz7pmidq29oefjaygj9jx7oa8p3z1otm7rg27f2g0nyorv3j9o4r61ebtsuxkslrt8fnh2opc96xpid6feedbaprhm5vmgx7ccq3a0yaw3460135dah2zgyu5n7pvkk3xj5i5490z9za41ez7tvrqmx8v3s6qe9r25a9h9pks9v9b4xufdz9m68yvlyseoci263hnkcjo59y2j71zy9qubixfhrb1iwt248kwij999wfg8iuvc17urtop3gyatibkroiadfjot4s1avwsveig4137b3na5n4pm2yweaj0yv5o5ygre7anzg46u0epqv781wz7tkv4778fkxq3ao807t2i6dhodfo7410mm9i30srtuslky1d8584gvwhfpfi3tftxrm2bayejrptc7n2uweiv5hrmx95o0yxeegn75wehs154bbod6c1bb62mh9pmk7m2tgd8epmuytnd570b25m8vc1913ugcz7fzsz2miynfyel70vrtaiyfvx14t0czblo5cikuqpui3m7enitrvdqm5g0ui8tui1i12ytznz1efcsx43fzbjq8nety6de99hdxfdeqt8d1qoc0bner40h5y8sot97rwjbe885x5qhtek25kbkasi7dq50jr8nzotf6ct83culxhg5ybl2b0zcfyyy62859c23ffl7vorhpp71t4zz2azfzcbv69tnisoqarbxfkb26qmsegrbjacwewelta8pl6a15pv78qmo7rehx5e2s549zxc5pwtame0hel7m95jpggfrjj85mtlqkgshfju5lqurbihn6kcro404rfehdtqgxkmc7z7km4qhzlty5p1irhgq0zezou4jn69oiw9dcldk6sf8img7if7opd6pgc0dhotu9ui7dg5ohxwzjj',
                redirect: 'eiijyo2b66id6kukf5ecw6ouqhtfg231kaz3drvkowu8latnk1yznxmp3nuscaocwzmf5s52ks6ye35tsf0e071kw0csek5s29bm6o85i5kgmkpnha41bbiuzs4k2ujcywl2hsejk7tb6pxasxecw8cysohckrg56arj7jm1bxqbtjqq5c121iwmmdevizuuakcw85w7tqz9zzz7xt2rbncabdbqvivrv6bi7vmoxoisrl11elcz5gqpyw3o378r30yjb1tsak6xwgexmy1xlxwb5bjbfbrlnqnlyns1vdtkb4qa2uzurojfrxi3i6hlou93e1ypyebhogmq8hj6bxs6ybrnd9r9oq19i4dd2y6ktqe1ekmllzev7uzosxlacfkxy7dzvui3ru5h24e8uqbswclfzos76jlczhs90p4xtyy3zaiuo3kweks1vu986bdw8qglgrjewbhhhbipl2lhomo3fls3qbj2mptp2w4koil89eo8igis3ng9tlru8bygag6qg8703vqsr21trzr66sbhp2maw5lq1s4s6zdwgm1z86g6ew7goiujcacurjwwjg1vybgazenw9r18428fl64zoxgc9coomp4ttvmpwont09gpvmfmqqnlx8p5tzc8q2i64qzkihfyk3vhpuqo2vge6r8x2atn802riaac8f0hrv00zvfegug03bevlplsmxvu96j23558zovlr6xqqh7c10zqwgpawasjzf2zmyv7uf50ydcviavgae0wclr6avhvk83qix5pw7nmlwzfsbifdqi6hmahswg23n26ikrj1v3g1pg7i1310j4itedn5xk8xqfdx596lcelh60gafegrujfnxp2mfbbmhhc3iz99cb51a205takvp1rbc97vz95ojr83dif2ot8cn902uojsffkuewrgmz3kogqc03btfuslh5flbuk1o348a9rt97gywpsvhao780bksrwkcb7tse67opiwwiw1pbtp6z4lm0bxfjk6ukdghoon718ts17vpj84i4kqbl1y0v1ufyh9l4r3a97933ruhpy2t9s4vr8nrneffbpib98d3soqupd0f85vs2ttx6jctrzyh33k5bm8r961amky5n8yi1fug91t2b56b7mwtbcb6vy7tpdyjfjxl003xpmsvhhns4q2s5mrd1j4vz4e7uf6zv6zbiboyeds972vfbzv583hr19f0dj4lpprcgce9148rbfj48a0zq8150v85h0ec1aelkt868kzsljp6io4os1mlmy8l9kazjynul1ooao3lnsmex7afk1xjws4idzz50i1fg3jm9gusnghfbv86buokt9k7m0pl0ugfndwpiait5642o47or844uiyht4abu9gn5ho9nggf5kucqz8bsbdkn19r2qsrjcw8oytbca1d2xgwp9ynnrmq3htsayi2fu3t6h0rj2herncya78x0fwv276i1qnf61jwz6a610ls295fhvy01lf5fb7w3j1ge5cd0p570j8ivo7iphcocueznl7064br961qop1wgi40zj6s55eadk0997jvpbz0jpv2zl83u30xwoa15eg7lgvbk5pjs42swd24wftl2ws76kcs96wsup1xe8sn21b8uw5gsu3lc0859pbd508sexa80dovuwouecbvk0srhk0yjy8rbqv7aee9y87awrtcpmi5cdxoclld5uon24q2oyvl1xiurkr62nstzsba39o9ktpu8vqnpan4rcep4o4kfvbju6kq478khqezpfmlrwzuwxudnhaqpmg44ej8srpz62ng6ohme3d1kcd85floe8zyb4l0sx0x2n01rv21yh3d34ojrtroiidokv25cygnz5s29351kdjczgz1yspqvk7dql0eiii4d3xty4ocssl9xhpfoi31gccno46sg6mt85f6wsqoqpdh4790i8b5hrlgjlgt6cosatjr2ncb7uzsp1dyu5mtofu3q1k65i4wkdzbwgn69gbunjsurq4r65kz5u6nhl9t187xe',
                expiredAccessToken: 119362693,
                expiredRefreshToken: 913589891,
                isActive: true,
                isMaster: true,
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
            .delete('/o-auth/client/delete/510cb011-9625-41b3-b7cb-e8777c31e786')
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
                        grantType: OAuthClientGrantType.PASSWORD,
                        name: 'Fantastic Granite Bacon',
                        secret: 'yw1pb3c4bg0z0yh9525t5c8y8yw5qpjt2rsjmtb5sf0k4ya3wswd2sdwp4wvm6ew3u62okm1a9w4925nwfp7ukjc6',
                        authUrl: '85armmyv07783iw9ufgn871c4zfivr7omle29egkvbb1q81q3osbsnse7b1erumufjx96yuh5l0ldeye76twc2h8z8pobguiqnaxpasaxs648yma77yuq7ck0z5qcb27rimb3rjomf31hqe8i9lgfnrj7kauvdlhw1vdu81w2lrgs6dit4c15irxzltgrcwoc8lzbqf22wu3aso2kjqqcvp8suc6mxdexqaz6f6gf2hdf75ufkhtxaayhcsu8idmlt8ec3u13q04jec4448j5u3bw2qvgrr2204ja7z2sey7il40doe9jsca1cbdfwvetbuwj7fz6sszgoh6uji0zo0xqxnaj69tju27qp1eccaql81o4ef9cspo9jkgwzk9gu46llt77a2p3zb7xw0q8pm2j9xtmug6dht4jdq9gaagb2dyn3eyogc3w0fnwapzvh7bi1y3kz06b5unj3mvydosqt4kk4mudqsw1dkzep7quo8jd8r07mmi5s0ih32x2ymiy7q9rkbja02hg3z9iuawdcywes9n9jzj59gmcs6ufz4enilsby7vxlaodxat0udvdehsl8fcdcy0a9g51hdzim9s5xcer7us52c1oi9y5trc9qi4pquvw7ffoktpqo2xqud6g9kwdplgjxzbl8pcgb1gcr971vzy6v81ud6gb43ueqr05wee39okj6xbk14e7pdjgr113l8kub53a9h4vo9sjntxnkst2uilj10gnt414sgja6sc8si0slm9elqp5vrgno3tqzqkth6v849uxb5j8ld5bp29ffe12gjbk3dyq6qjc6qu8mjrnaaodij7v2j2qa38ljz0vnjtobm4llow03pq7pfq8b1cqf79beuo07iokrh2w9luod8x8pjfadv7b9df0kcbdb14zdtkfu1f1ujrq5rrc9dp1iks7nwiy2wj640i2vjt9nrocla5p4niyuzrf1wzgp3nmrbbd6p5q684nfqn0ccgjp0lg6ws5t4jebi4kgh3mm6t1wiedri26if3ib291r9ifslged2kqfxeinupqsqrysxoom6g1l5ifqcj9v99bxixa3sypkbwfl4iuelys105nkon8keyo6jytotz7ikqdlsxu31953hze2j3zndcfggf8p5i92gdx8tdzufvmon0jifckqbxh9ssip4coz25ktag8kmk9kzddfdhnvo6ttlxkrkuiq4wqp98r8of4vs5zl97krjokuwzybvugfdbdgvwn4bz02aff1jyrtuf33v1clnfi6anckmg02iy4rhc826dm8j3iaxsavpd58q6xlxavl61cndrqrgtwi0bj0cfk0nrx1o1kh60zjml6lfuk0v04cdwe775hsw18dmhey83twu0emid9h00s0q5ziskbyte80ypwej29um2hobgy5aw8oxqdzwc4ia6xlk7ttvx6kexd30l189x6b1xy5p3cl2y9c39nts3lb6nhcduft5wjfgb6tlh7xql0432x3l58eg4kzzqdizwxijaokk2hhnrnkn87lybr05ohaimsbpyt8p3i80fczgioa8ye0nf0wgs2x3qdoanrdq8puxklwqx8p637xc9qr01dzur66fgv7e0jj55kbi7348o0gzn5nvz99bzmlmrjnhesz8ezjpodgdugtsitosfr4oxu0yi2bxu5ytq2roguw4vnf78qjd6fupe46ldqghxc59uj3f2l6qtvn57hlcek970oyezrfgcg9wulhq6x6cu9cab3s1bopp2gkju5tpe51tthdlcbe57jrxltyad9q7u6uux7tx7vbe1x9kc9qyysvrq2pct1zxkxkl4k6omnc3fk1ombsgfjmr5ghjfuecwjd5llmys6k24ge0gjy3q7nflhxzbd5zxm4x3rnpgs8nvs7zw5j32hqryuitw8kl43b0x1crdrv0id5t7j3gls8po9myx0m6jk91wg4orfzicecayfwcphinftmaibkz7d0b1wdhdg2zfo2r5cub2v7z08c4y6m9nnmyt9jedhe1',
                        redirect: 't2v28kajpb4bvks0cj6wvl8y0gn8mb6axfnle33zc15qezbhimpqqiuop7r25kylabs4l44nahmldu4fupqars4r50b6wcsfcy3cdqotii2ckhpxsesoro1uko3kiatu2vi1c0sewb1owyh0jjso03gb7rodztxchlz3vb2svevn33q824kg9ges3v8k0x41eb18rx3lnzgyypi5fv5ngm3nwsphoex0fucz7nebr74y5et8rcexza6qokhpwq1st7fb9i3dsn44un74nmc4xij6pqopzm46o9vy0bipkqzurt8vxz3xjy1sprjdykdf8ukamgi10uwea5itplfath13apjymixkkw6ettudm46ktr2yj26jrgwz6wh6yosvj1lq6d1qt7142jd4cfsiltrybk2803yhvz4v0xurmbfc1xesdltzq394mf5q5sbci38pu1dl5jodeaw7n91w0jdxfszbyrdpg0f0up6gsucduxulv6zvoc168yc23k26bi8dj987unmr2d8qcvj8ll8dmrpn37tid0sdhhipqw77i9d9s300usodf2r7zmqwmsuyhp1gzwydovxfmvigfg7tw4q51ap5i796nld7lniiiobw470ih8gfbz9wbw7dqc0zprgethvduvp1m7v6l0uqvwfcm94f3bgh3da26g6myg4y0ji12qez6bzxp5qivlyzapur151bi8zdfl4wy0uoci49dnii7b0msdy239wt1von8wpylh0wrp6cgf512mlkz2g9qn2v1tpbmuub90vjajfvwociso5vxcu0mbs6za3nyhwdi1au60c919fspu889l7xbaudzhxukxkveqjvlwxjm7rbkuvhgp7m4zz5cy4rjj78o3mdeeibg24ylwfuqkwye5mc3fbisa5hebawa0x0ov94qrue9a7j1ok6yddv76zdatz9uvrg2cwr4dx99t3fsnj7s1wfpyjdqitsxhmq8bbopf89lwgrkjy69ev83rizahdettalhnickjwxoijkwx6o9fkc5m87vjp38ddbdmuehn46dl0jet8s3n75ysr0tnrd7bu28mx4xriqqegmz3tak996i4s3erarqioh7lacyue7suocj8umc3lryheomrf91qujay9tgjvu7jeekmw6po17y550ntysyyv9e2zjuj2mw415vbzvezj3dp9djs4nht3s2f2jd69yigtb7qn5qzm7k7x8sxfvvzu5jxsubwrpglzoqtgdmkv6d6fd2rurziprclr1c6lontc8xxigojrepqtolqlpsm233gly6w4gqqjilt6f7fg1q3618my6qfck7xawve1e3fnjcll1a4cn2uu6a8rth11a3jdbgcuy8jlel09u8wpolm2xlxh0qa91ncbof0me4ykzynaxrfrvyqcyl66tljhrebscu8zmu5vxy6d6333xbz0rkunt6y4twglxl6ajtex6apc7c3hvnm7r69xet8e0tcv680naspjevjt06dhibfke6yce5sqx24k6c5ck3gl8sr6jj149but83iilqds2x7noq4901lrrmv2i6uv84bip2hp3ctiqt8b8wvrgauwwj5uo09ctuho5lq2ewgs15c9sxn1jp4zq4uowewes8v6epkocp8k5nh45z1w2cyh5gl1m5p1badty5vd2a3f9eqzpml32o7fvd3cetzoh7gi27zaebssjzikyhk0bbzl0ygmsp1aie1tytilyzkum1hnba4e0v9wo2bdha5u0pxe86e7dcjl7s1b1ljaulppodgir5wnkbk80waomv839kvkk2hib12ni8cf8vcsxq9uvt986x923li5cq1g24s3yw6vnssicm80270rxv0a9lb8ymr27vduxfiv6g861840e7c6298zc6poxzkjbtotwb5406epwun6a9a8k7pol7b4dz78akjspbe9z55493z1ob9auy73x0t1is27m88xxtnyk44e1z4ruz5k9u82a8kiojxqfe6e2xj6utpig1nzzd97q3d658uu',
                        expiredAccessToken: 353941917,
                        expiredRefreshToken: 417954772,
                        isActive: false,
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
                            id: '72068070-b9b5-4458-a884-cdee5a4f3489',
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
                    id: '19a2fcd0-3c6d-445f-9b9e-b80db2c5a251',
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
                        ...{ id: '2de4f68f-2318-48f5-84a6-6b0a32fe35c4' },
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
                        name: 'Intelligent Cotton Gloves',
                        secret: 'pslyoi84jkh3gouo0mhrq1oif6d09fqjnl6dybqffmckp1vdbu56s47acl7d0zsqke34sjp03hng6rt8248vlu758',
                        authUrl: 'p986vk7wznjn609tbticgb60mzrnlkdxtkwr1l898da0padzfc6k544dexe6i6qu0yrsya4ar00bv5du0lzahhxshokr9l5wmfb1jo7b66iboi3jwe9sk835rkukfl5gbxrg2bxhlgodxywj7bfnazj46fasfghbqu5qh4cxfxm8pdgg8znc2p8fuvxgv86gxlmszbua0ffp9w1eaaz9k0gjf35a9zbn85y4xnwdnc8whbomuukhst93p7zb4jxc6tl5330zdm5wrac22av0e7i6uqfbbzvpsgp8uuo3f7wd09qm41l5rxrvparrkf6hp1jn0pdydxcsare8nd6ztxdszkzleewgc03snkurdi6tf176xdoclwrcegu9c1lkhi6fvda6h5nvysb8sc3vshokg6jx04m4ycizgf0pec340kfmx0l2c24s1t0nbvclwfnwawxwl8221b3uo4q2k7zb4uslcpuibokh4inph8e9rd6tj0bniuiehp8qmw7tdkj5csthvsc262hl3dmghvmzwxve3f28phge1zwf1yx7xtmhd9slazc8fmgi50nl5hgarpe0mxvqt5buiotrewdhusiwrvhq0pqroy4q4zg3twzlb0ym8yyjhiraxo3upy4g854yki4v7rg9klbqmgxeq3xtjop31u1j42dps81412d7sp3l9c5br6c1vvoycc2pchw7ggakusljnv6zv3upwodyw49q320c6tlxux0ojizzx75sl4ezy41dy296wbv6xcx0pivbmznbnu3761ph818dwyc7pfykly3q5mk57cqu84tmx67uep866ostt47onw2kww3z8ktxk7n2r8q2w674kh9px7i5dand1dbej4rdolkzylt43l25ooxuidtkcndtk5ortuqju03fgzobjranj0fvs5085g991ixp9tjdhcgamm4r9drtzx9p4n96gijcumntxbjh6935u64awkbex7izob4398h8peduz6rjdiocpd3tzotpnqpph2q28q41f8aoeh4jtmta0lkh4bh8rlddssee4u07updxls1v84ilv9e6ijy2m7vi0t4esc64ysuv115bhhf7t82ssj32lqab5kp1tipzbhb8bfzm8tjnb7mnyuvyh1jqedlsrpnnqye0x07836tm9x944zkabon0vwschpo54sckal4tvplvhbxiwcgb8akrsyyhuqkp1o5rj6rx14u9y066mon197x5sjpf2u5y6miwpr7gnzlx6qzou3mr9rjbhwd3yzl816n7xw4s9v1psiocwpk9tr8xfzu9wie7x3c5wqr7kkjf84wgf6u5a3hz9oq07d7fcj2o1dmnpftfkcqbkatz69hzxr9uxg8fjczppb0ra58o15v12s80xdyn3i57vi2qurwyp6mpnxynn8gnzx6578if97gxhkb7naby63xf46l65f3batjr8j26889ouuv33ggg6x4vjoddbpb0lzo0lru212y6ejw4tmc040tocdv0enlcifwkj54gzvek9ti1owkbusxryactanvlqm8hl9moqk2959umgl7b7y06h6eop2bq1oa23aewtnljnt09vqqvd1f9ffwwxpo16i3zupwxuk4k8lq7mm3u1vl3a450islgh24vtbjzqvd9c6nw5p4qjuu0eec07y3x9ky2aronmkisj0k4hl3lzg0euc81hmlvvbtjyjwnk2va1w3i7mx5wdu1rd6na08y7nx6wf1rl112adpj4nzjkb4nlbf8k9gngyo6z7ws6j34527mhvym70yl9zkpy0kajo7crlepziaftlf8zj89tlg7ggxnard46h2nkgtt1gimhwxu0izqt0tlf287sxiap8v7id7z1abfekxuwpjav0u1v3ych15m40b7ch59y12z3f7rhrlnoaqe2opiye39lowmpyyyr62se727i8lg5xz9lhbof3kx0pzj32yz9mjutedkxdud2uuqupjxou72i714l2de6dg82sbgb7tuy570c4hi108xgzi1jx8',
                        redirect: 'f8xa6zpbg6af4pjq51ql0yattl50vd6ohza0rbhhfobfohif6legl5gi283nk8h1q969kqf25k0a8cc1aai0zwmucbfguzh53siayaw7y65c16rtheiri20q37ewwlr3pm52fxa48ns73r0i9z8lg7amsg36m2j66ise64pr2g1ns53s3yppwcx63kxsaxyejzjwk3azg55zk3nkt0afsml8yrg187tohkiagvidgsjv6x1f40ud5pv1ml4ln2y67fttfy5evsco4280zmw0cdl93ziegnk2tqo3e35fls91trn4g79xayexaqpiqrv97a9pc7zmdmjrmsye5xfcqee6j7dioxcwizxw6dzm1oh487pgrffovx5ctdt37u5sezrumx3evkaz1rfn58nay38qpyxuoheahy3tdgh0u40hj9cxse46tylwy3e6j3kphbfwqfhqamplln5kkbguyjdx8vnj5jbkqzi908v29cc1avl8gw1akl0qtwp9dpjkrldmul0gf7vzzpxm1ysvvp4fve7qs1oul7zycnzd9bw9he3fts81q3nchcimduzo9ne5oqslpdy5zdjsf2i6tnhnuq5pf42jjoxerse3crbkkrsaqnjflwkc3er09o856cvw4byoevggo3965aoiu0x1ml2lyctxo6rc6kc16clwuevi85bv66yd0lkql8a9a4sj1j3luymf4icb0svaq16qaua813s60tifeppx4sx4t6l688qz05wf5wq8gz4ky88i8uuemn1lx00r1uq2iozq8pfuhfhsoxl1wr1050brqgtf83i9io7mhgs7c0z7s181d5bpfdesc3pz0f5fmh6314ovitr4r7izce33avyopjqwktpoehzxaihfqxplncrybqy79tssgatch4l5lay9gdkcspbuxxel6radek9lc6i79vhhmw0cgnhn5h3oz0wiqisgw062fmy2w0i1aoc06a9fd4hcqlt94d7swiwrt0p7jvcjx0ii4g3p1cw1zzt6rxjlkc1uoew7bdzuv7r601wjofc09qyal6s7i7v4ya6dew00kybalx2bnkulop2xokspwatb7qch9kj8bmesfj3i306welr9qwswvvv2uc9827ncndiouvok64245guoig1q8rxyfu8y5sp5y979lwh6c38ueyto73r0w5edzca3ivt54x9abazartdi3g8yxonhk1m7mkyx14rdew4zeisexiq0cdgqmi2a759jsv20wabud1jji14m4e77bgnv6lq4wnqawuk1612rwqrqe1y2awolucaepjy9ok5gya41vogsn7e4765rfaq9y1m548zjumygow5bsa50i8wtbchldk7rmgkvh06o53aks2q98x0j7ivxno9nson5fq3xsmc666y2veqx6wd7nxx03euvq8bdmznyth8fiih5b1jm7htvsir53nap3lgloq7mhhy7ceglratzcv3qv8dc7li3xet42x1o5qxm31ottmvarhapwmc703l31ilrecwv15mhfvuy1za12ht5oz2b95se0040t4ee35f1i0gu8dj7x6ia2f1nv7zj5zw64iw1c4mqnn859im4hfmcc8684em5kw9r0yykvpuv5pm3xmoorpgsgi4gbqr1zg6aoguxdgdxbzqv4p8ygclogw1ockzeybigivpdzu6klb15hsjjgd7ou5ewgw6sl13mnaped7t27bm0beyzhr7i8rb2u0wwxhkmdi4se9hbdncajzw3ijbu1qxzmq9s3888zldnkxejk767vvltd69sur6ckutlan1txlom9gcstxsfoco18co4cj5e1eca7eimgvlqh2jrw8qshab7efpizk9lqdl2gplrnu7kdxtihsq2sg9dkew3oa86ez4ownzty5963vvurg5gr0nbadte0h87gag48rg2qazoppieh7d5z3v2pa530wpsfsi7mhpdgka10se3rr3nm1m6kaevvplw57l60tkyyac1vwrhpgxz6erevoanukg92q0qp1m',
                        expiredAccessToken: 588775236,
                        expiredRefreshToken: 511767988,
                        isActive: true,
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
                    id: 'b21203d9-a858-4539-ab78-fea49227b3ba',
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