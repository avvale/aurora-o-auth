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
                        id: '9a01b27a-2262-4af7-962d-dc7dd9530175',
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
            .get('/o-auth/client/find/6191e6e5-e57f-4b54-a891-5f76921608a6')
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
                ...{ id: '2b929e98-f91a-4e43-a724-f66a3bb2605e' },
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
                grantType: 'PASSWORD',
                name: 'Handcrafted Soft Chips',
                secret: 'cl3xq0okam395o2ej33l7a2xs871gdv271skk6ti3ornqmcgi2mrbmxr6s6ze09gt2n604yjpgqxsce5jw540l4ro',
                authUrl: '1qz08fiz0ai1ybobngxgw7vh9mfv3ij5t2pkj09gu3vda7j4w9152n440ezqf2a58d08tvmflik5vv1fn2nvkt9g4ost5awvh24vqj7gz7ri0lwpjhbw0reb56y72nq494k1oom365yzv9iy8fbjrdmf9o2rk9uh5wgyyubpky1w5mjb5toemsqhdd9hw4j8uc2pall0kqs7st4k1bvhn926prk4h4cyrtu3n3kgx6fddsvpdxi8cwr3e54zwtpvu8cbj1y5nvn46089eypgwkd8yt21jqvotwyct4h1hcvxasr6kfkow5f6ud1xw96423wfj1mndnrje924imwcg2f0ebrsdopeq0y4i2snoz7mwmvn6zvmvh5t8vzzhjkucpddly05d0bodzo5mxfr6ahgmaqa0mer84mv4fyyheume20liyero1x3lma245bf1j6ld4m6z4kemrx26v47a9nrmvyrkiij1kgo8qgrwnsjtg0r82tgubzcce2c2smnco2kq2hru5awqisvw1pzj0u44qxa28ezjq7meg7taunkubgkgmhf3bbutuw257raiuh4oxdv2bvilxtip97zhh6zort0hhx3t6xqcjd7zfuhm00kvsgy96klqmx5ogedpm34ktejpho5uf3jzavorpec4pis5fxyqzmm2o4l2ltnzh0u17e4gqo9nk6bt8e3x55arlmdls02b8ka3tukvyzahb4mzd28t1hdv18vaeaj6ufrafanlblk27ezt5zyfmmtu3j384xjvu9xxi1zw9w2t8e37dredkej4qdzm6wg898wun2qdmzgw4z076vmzze5yef8znh4dsdz3956bss1k9ye12fp9wivegwkguisdihgynvy4ncijax08p53u0b6w8g4208rc6s3pjwjswizprpzx3lb6dufz70sbmfl58cfkpmi8e7a4x25jkfj1sp80ird78ehqw4zvl62w7vwwpmgi6qnpacnadjfflu83p7twbuzffrn8o50p0gzbonmb1uy4e85ov5k65vbfds92d28d744e4rvs1x5yovj3qiyugsdoy8bhdxjpiwuiybfdjihyevf1pidftfu3u6ssjm8jhao8od82abmx4x3ix4685ggqe779ch0iuta1go8is56vwwtayelhv37lq5xfgth5i6cnbm1jhqadfd7mzxjsqo9iqvjeav2xqwz72w5s8ch2rd8vs3h5y2a57khl0uvffh3xedjutyynks2kot1izfw5btwpd03f69lw7uqrs7ydw4dlvx6kwem2uzbt321510p7uykxarv3wzip3diwbwhhe7179pjssc83tcrr08i3nt8oobekv49rfoc4tz7zynvm5unacjp0besixq3c9i4krjs96yf5nw7vzx2sk292bc243sqkwhs97c99kk0f8kya9qsy5ypyxyobdn4oa7wtn2z2wkjor4cm32avkos3n53z0b44fqtji0j913909fuaywnzyttz5t6jlrackk7o3z238jpggnf52run41xcslxi4jtc07qgnflqahacb69xbuuiv5qd393ciwnwlbb6bek07fubys3bo4sjtxf3hps2abqadjkrwh3cs4qlmswjsotp81znchl1g4d1jbta1qxjvci7gm91fwnhrkz1yhpx66k8iuxnpjcahwlzi2xmcwnhp8ddfrutcdipdz8r8ismz2hdkh96ezxdn5fevnw7nmoa4o7vw7j2kh2oxpp8d6dg484yhdcs42foxoh5zbv977y206yj985f2wfxhxkj9dndkj9lingux3czfcftobxjmxgx710gmtz5hocnem0a06avz5jvjfbolh0n4al6b6ksw7xqj2yyu1q07ki4r13gw2m08o07uzz5slj3ma8wczx7nuto0l0oduqic795n45sswpjb1n7ap0th9sq0fogh33z8l1uey9iap8idmhisfsvy99txmrwexufeoyatsn1bhyh1pp60av66g0qcy9aqzz1enr92uw103zq2qaagiaxbf',
                redirect: 'c85g75zwi6btrn4rwkw3pxqiwcis5h44u2fs6repefxj3vh70v6upvffzzd3suwvuf6tadwimcrk7a4rbjxphjspin3h3u9e7n11d5sumzeavzvd63tvuizx388l58q0n35wq8x6nu1lbszvl27pgq8jugmi1gqoq6vhh7j38lv0j0q95xp61pfa31pqdq5rpcwrxdf84xdkffr7n3gcsx4ge1c4fn2ujtawsgt080ypnupi8oud8sise246acgauuemds3u192lslclxr3nors8y59qncokshuurxxf2ntd7m99zhui5pxrz7ayxsx8ays2v7twl5i8ha5onud1ec8oie1q8aq9390afrcz7mvqwt1k8fkvcwkp1jx54x8as3aer4qv2kenxoz1dpi9hcnwp6hokf0nhlze1g44tx4kp4e2m2mx7j7lsmscqurhf9jszr6guzq2yyammpuyw32w93uz3kgc7isux5fw9mornj13wx9arol803kiz6i2arus68r65e4ulsqwngi5ldum98efuktpuxeppxfrxyndcch82ycp3a680eifgxdz3996c2iawu1rkvo33nh644o7l90xvqbjr69zeqe70nnou0l73zemywdrmpmgsr0tt7i1gmy9bc72s8qqdbobyva1r6t5v5x2gutg5khe3j47pw44rq13ba3d3l9pvu7ckaaccx1podkf8v2yojjungobyx8msp6ml4zaacl2lr5oojda1jtd0xiydd9dm6d2hklyarjfhkf5ofmjmyp4zjoyqw8wmltc3dcc5oe62hf5k88byjd0juy0yyepr5xa1josxwqce4kdp279o8swiieqzlhid3h26l0dhzqm7r1bcri81xtibklf9mew4tddr3tl7ue7bub5my60zlicsfgsz6vt6q1ghg0gf9j8r7g9fkvujcvgrd9led6gpq4zk326uemf1c9jjvabopcjc7bg42kkg29c5ccmb8k9jqmielkvxq0h4gyj5v7nq3hkloydt6uupvyjo2lt2y4kbzct1jif2xuibktaw486ebfcrgsdhtjnffqyzwgr90jahjqlazm53n7lhyaysvxscotutg3k1gnnf5dex3bl65h384lkrx2ogk6t7jotoohnovx1iujtbt3mvy9y90sdb789nj5l7j6co6oyscw9n7mwf4wxj14w9hvgb7rq7j2rv1f1a3r23nnem4enwkujmzmez90hyd6rggmvjnuxhck3hcsbnuz185fr59hlanwra71t9v4auxnuyxj8udn3qtca2lpw00qmjz4ned20tsdj8a6gqn5v938tjg9i0d8dnecup52hlwxln49hx6csn80fo9x7affbj8emoh9zh7356rvh6x9qk81fqkis971sfxt71ssf2k05kp33bmtkqqomsoapruya3dj0s0uuie1xnhj7jqegc7m5kxs95g28nlphijk0xc94emnyjybh8in0zj7oruzln2dn4m1yx3wjgtrxiogl73yn6iwhqbgz5p435mvyeohgikuzlqrbjv1bp1eq4moulcopnrb68rynxypyq5vszx2mlqmrdld9wwu9wrnds1z78itl3dndzhrefk3d39lfxq52ga2nouwr443ivap3gvju8kxh2a6j2em3o3g62wgp9wwyk1somsnvneo1rn6mbm1wuu6aahr9el8611kpgpdjlwaevma6082nies6t6gp53l74t7gu6s6zckyqqnyh0v3itp3m47gq7j9jvbk2lvb914bx2pj5fuafyvpazj2j1h2phjz98b6c0tbxw2jvqfeqpomfmlei9pp59h17ka7gumetkdrgf8w22ch5tg71fqah1l003lw6dhhisjp0agimqc8c030glpaultksv9nt1cejwx2vezu81r78ok0gfsfipx4rs09tdjzc145bnmz3o1fqouzfi2bbehfcff3cfjxi8tzyyagq4g8aloj370bzra68k4msma8cjsiji4zqczqsjdv95rrc9cu148r6qyfrda',
                expiredAccessToken: 418382984,
                expiredRefreshToken: 502930848,
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
            .delete('/o-auth/client/delete/83783952-f2e9-44bb-8c78-797f2698d65b')
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
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'Refined Plastic Towels',
                        secret: 'upbnzere96twq2d23mfz2prz22qedwxegardpwub765ylr4jdzm3nbfcx6scj6qv5h790g4nboxr7wxipfrq8zvg3',
                        authUrl: 'y4qhnxacescrciqrxnfoccqfs4jv12qwcvv2ogwdqrwugtj3kqjyy9n8k10wpvzondtrjmdbd4yjl3c9dixctcw5vvgjy65l7fz7p816ws1qjun5an5ykj7pfr8tgv9bhvnd3bf364cri2vlc10jb5imiphmlr6f7ztgqwl6gnbdjzoaeq77drlizw6cudo3qh6d9r9y18sq0xkvosppyz1o9a36maifurpjumha9mfwyu6i31dd9o8yp1h9nao7rdf1mr4p1zfz1d29mitb3bkvmh0xyv3i8uu6287cgilyf3v7q9wrf8ujonxm847lis4jvd2jhxjy173l84nndoqzuidzbvmyarqj1sdf3doitahk450310juq2kx5k5umts2g5mm61hzftg3lwkvvg3jslmqoj7hh7rny0dfyyrm87uu99iwd4xbb08lh3t7cfez96wgkgbnmo38jy7nh79qygx094ghat322txtiduuxgyx4gh98ygcvxago4d8v1sppz8v0a6vcwolyc6t2rx3eidzja3s3tkuni9l326rdx7eae7nmp7x77d72z2efx7l3gcl5gc2kzcnjtk034arpx0idv1dnsuuvd8a0yf4kq81nuwjmux0pdbr2ypga5tfwybpbnda8svicmoz96y6bv18rbte68u2nh35fc4wxwmaozgpyqas963shr4jsoen1f2q5uoufg8pjz069oj53hcfp9g90ouro6nkz8k4g0a4vbjdsxq10sfmc1o8tyur8t5cmspnj4l35dqb33ck1dgy9nkah4h0z8m48vp1grh3gwrut75dojwg9qvcj0dd0sax9d3g5zjvjn6z7f4btjt5y6xzym7ddy3yb2caf1p6v3h8wub2d1s367l00f8ugl1w2n2s13rdb35kllon96ffqkmghazg90i033x3ezps0dd33wxm9kl25jt17uwvmjfj8wno2862o4umel6iida6rnsrt67zmaq32xg42hm18v6m2944rqg9oq31ew6zsuae36x6kpw93pofj7to8axdux45elmynbs22p51qycbi4ete1h44amh5bd87l2av4wbbd0jc1k4y7fdk305b2a2tozvkp77av2ukjtm9keg3vf4v734b36swcs8ccwv0jvcplv4ao4h6x76gcjkq5h5oorbn18tbe53rgsyco7qnzu2ws5xgxj63n5ms68kpmcm0mqxbnxlxwhz7odxknw2ck6nphddze7k1w0isvff9b35466gttgj235buae7dh3oth5a2l1ejswn7myiu3hav612539rkqrrpjxefl1wdq7s8psxu2qqxjikf3h84r1dvfb1qzj5ncnsqmbcvsz536kp53vcwkf391wxjad4n5axxmym9kazamnivyl95ia135j7bgpab8zvwuu4llzs2chmolt37235ybtjen646n5bvdhs6hkrsker7hd9o92qo5turz5lekcjr0tluolp5frm7hgr1aobg8eae9dn6l2eo156605bgff7thdnxdf9ug3dmm3onqc1k29eaw1tio71xxab6kfpedg4n0wsf9bilm0xpi59yknx2r1ut6p72sbaggvj1g71eco99em3mhs1cmrnqd0nqiw5cggb0a2fsvchopvj29nsd49fy57gb6b3wgldyt98vd7ewdeis1estxl0n8b3tr4ekike4ha22wfe88ct8sygytwdhspalbj268638machrm6bc0kz2od1rautao5k6qt7q3tl67fbi2m9qbf7ec93ebndkjfk1j6xaxwgnokwsftf0zo5bkdps20chynkd4kp2l19tkdbqhh51gqu7xk8kig6wcs1twpxie3tivr6h8g2j15r4spc3eu1i4ia4hcrfzekpx436pvmhit4rrs038xsggtvxu6tna1nxcnbj3yumuf6ibh6ct2j7wjatx8kvy1uib5z1dbv2yzh4612lcz73dij67mzcdtomfugdzlxtxgtavg11jzu1nspiepfw7kn9l7re5f3jwb063',
                        redirect: '8q9mo654lort9c1zj7b4uqtxhpelibmvg48u6civwzmmhuauh8mro9wewjvnoj8jp8ks34ai144rckgzcqitv1zf50gklm5u798x4audzbf44canvt7wvw9s4qkekhaglmqmxd1wxkjwko7fg8vbqlf9ff6df0q6mm892jn5koc1fivt10rvhmoqs1wnmewofuhjrmgic50wmw2jge41yq09zfn8zysahp1tnf5dx0t8ph6bxmw5k9kzakeegqdy7pyfytpfdst71978wcu5o5fpfi3m17j5irlzrqg62o21ex104o2rhagh2s8iw4ltfmcbhvpenxjico5tdi6yxr7wujj84z2t7u2pllczcj5wpq62hbtclj1dbmtbu6yks66zpodw5mmlp3t6opothp75e2mrz67meavvf3ujv17gs7xstq7czfhecodstf8kozkjblq33hyfacaz4ke2x54i5ltam18u4g1zmkn4wf8mos7crayktue69z5o4cl77ry0b0ind8o6ce4h1m79rc73o13h0jc0dcwsxcz9km10z800k8okb3v5za3bdr6lmjb5vzts6o95we23qfb68k1o8f3rrk4g7umiyax1fnpy5bxfv39vr40teuhuw4v8caq8aoti24vx1iad9rni74e291er653n1ipfx5rza3kd0ivq3jav49k75vthlulhzasyxw7uvulqvk17g5bm42579lbrrbukfsa9hp5z4oir0rbi3bf9je9td05dnyn73g5lqu6j3o5b930l3u0kuazp87ldia6hzta562gplorq2yv2gkb7cq0rbnsdi7f30cqjgubslb0t2mv9qetcst2s2abkx0uf67gbz43od15cy1gtftco83rqxkfbespnpuv2z8ml9ycdxwyib5l6jr697ab9oqaj3rpbecbpqg2iwfkuws8ay4f068wx63jrtml27bz9jdx4znlqo4vo3mcpg6k37lt0dbt89h8l42n2wgc1ytrvgeuznv0v94rhyrpbxj24ul45ymgrcwzo7efjbssqbe2itmjwaehsy7kdib9ju6isva5291fh2j8am4snxstjjr1gvub5kp3cyvlw0ra6jxlken47h8tsw1v16arkvdg7t8wktsz98jd2trojz76ouu7lvcgr1eoxfl9qiaefyelzg4me0crziogxgpdau5twg6345niljba8435ia6gn0rhhj5a84s42mr8mup7effg7602z9kg2ndhviwf4txoowce4bv3ytauhf16wwba020n0rmsnz1c2tp2qb8enyx2k8l0z7tp6s1ygldipl0dk0bma3jymge4j8xn5k8s7s96bxy3y06n5tekdnoxkmhzw3fh4kpl82s6zyamsc4tep3wlusqi06gtxg4x7bfoqediq3abnqtv29g8axyj8mqrqjidvhzku7t8x6h34t2wra9u1pjplk2f4axs19d7zlrxggfhyxfahetdhkxe6uw5rmqdlyt7ltdbnj8hdw36k8mdn7vhrsroxl1geer61169ieg2rir7puwluadwnasnv1miqvixk70nh2k664sknovwsvxchv7qamhu51dd183zlre78fztb26diiir3iawfcq3qprs3j82evzaczc70ostec6jk2qxc7hq4jp7mxx339v9di568hcur0603el9x5we5inzqhbq42c3rtt6wix7nb3sn4y6z4uyfir9wwp80cu3kyf14kizsjnwo0s2lkljgw8c46jnfghxpb1ylwz4jjagbf1xh418bovtnjgqg81ub7hqag2bne43g20go3z2w1qsyuzwoygnucz45d02hnlnw92pwy8t6w3y0vgejo364o3tfsxu0p1osz26dgyg1r5edync20asi5wpqidpvucyy63f3yun3d4i48xul0duzmtkpm3euxskawn01jw6sk6ughm28tu1djnis2k38x4hszvy65k7sy8ge42lb2ztlf6ekvgc6998dgn1kh12c53ubwijmz1qb0w7oogh6tkjyp6',
                        expiredAccessToken: 780229050,
                        expiredRefreshToken: 394604281,
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
                            id: '038eeb20-77aa-4ec7-bacb-372d5091ea73',
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
                    id: 'bc7aff04-5d3a-4dca-b07e-371cfd9e7fb5',
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
                        ...{ id: '986daca2-b72d-469f-bc0d-47bad2be7ca2' },
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
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'Awesome Metal Towels',
                        secret: '13scbyo8zvp2fo2onf7rpn7ywhz5b8c8z3tzn2sa3xi9kbw4t4pkok58vbyedamuwecsrq40c6cl6rliv9wq6esoz',
                        authUrl: 'm98lksfhifochsdfgz5zqjnkz12oaev7xq3js6yk9nhxkw108c97ujdgil0fg2h5p3yqlzbxb893ffbenlkyghvq1xfonlhdkyzhoc4ttqjpgzqm83xzyvzr4ha6kwyr436s8wmgfn8qsdxs0ra4miu70vc3dhpclzxqq8efkpl3tuqjnbhxax2cfpwahpk8hjesmyvjhbico3uuyit0vouqb1mx5yv2c1jyi7upoj53l7oocn5a6k6vaf91akafs2rnfdxtvj8w658ujdyalp9gia3u44tj4dcauish2jy93ekc28ids58qwg9o7zgbpelt4dko68h2x1anwgrh5d51u629e68mfc0qegj0nazoc4804hjbx8xpxwj5lr7r7u9x1ms948q3ehbmlf5bie0si6j1g5yjb0shian4p5x4m6ng6bwot9yu3a7w019jhpvhos6favs3qatse8nq7exj45ziudga3tff9qvj9rav865riakxdxpfmb7icvltchb7tvrvgagyao3inu6ku19qz9v1sw64qrur6ls14bhtdcxifmlhr6n4njsjesyrdq44sm5okx5yjl73uvf34hj09ekhe8z33k1cby7qg3wiu72gbq0eg16f2jay978r1e819irb3btpt2ofyi0ydncqvxor8mxc4f9fbewwfiusig162l3wl1ebbdrs2ok4sz6leg0nlknpvck6slxo0e0lkkhgr24204ctjefd8ln3049e3lmqeoknrnzeqxjpnuao3sy5tnw7lfqq71ap0ld8fj35y7v79wqy5l2ygp9wcjird8y7jm93xckqvvl0ck1i1z4ujeires0suu8h2sewsfkzw11hom0xbrx4bd36cgm4fux2na7pe7wp8pzt8mxhjakdq07mptp6esg0k84yc2e4zfugwy9j2t35h1zk06e6txefdihn8mkec55pfhlqcwmgub6qh60irmgbm3mh0pr50ozvuwv1ib12piult6j4gjz9h5wuntvuxjablu50gi94yap6ymu7cawhhwbr47cq5lfgp1lyce6jt6rxdfofe9yv2xuz9gftbyvkdobyjomu1gbeinfuomvwdajtv2r3wdgwrs2zoc2098ttq1k3xsuz8aobbvwzzh2eo3onn4knixkwjtv92w08rbq67ck1fahuk3ewffo6r02e9ayzikvxnbu2ie9dd25adgbq5jxanloruv4g4a7u64zym5lwvtu3y2vaet7g0lj8qr5srlng4z067fzk469yt2kb2moui3ykdql59qi2ec54jzyyj28ogb0r92ne0lakreic42jcqe2tweakclw69falznaei8mlm6gtbvrga6tkeyhdqargmlfq6jp5mxl1v4hb1m79p51qovf6ttmjst83rbigdrw1wpsfuawrgsjylfc46lsgwhekg9psbag62f25c4e7r8nlwxig2swxx49xax3kcges9wzn0xplofmrb3nhmr5gw5xukngkco5mavet4r5k1t8arcyodhhlko83jvnjutscwpjimgz2nrnms6cuitwr5ay7ko6guzyv3u0j4lnbwjuf0ja95a3lcnkk94xmlwtwr7xrvot8w6xytlsftgng8usiq4v142rqakm7h2pytop2iaue4x3yihujahee5s9h5jlh36lsg11t34l5zqciv8tnch3oatw6yagjotwuku5d100hnp0koit3tqfmv735e5wf8ky82hzhfwotkt52k7zpr1fl9ve5u3oifzji5djg4wthzhlg6jd6gd10ye8ylzx8h9gnxkt51vhglnvphvs2iojvlify4z1y6zu4ljlge9ivwi7l9liuan1mf6x2wy0ymqsfditkkaxr3dabi8nagbk1stli17s96jqrzwfm229p2f90f91jadt4leg1c76u5robahof88or4o7ox3ya6ku72iz8lnqef25sot5nk76aa43439iqpc22slfe1t07l06rd09cwxtl4fkv6j9ja7tsc7jzjkztj239n9t8m8xdqze',
                        redirect: 's2zpugyskiqip61x6mh205fkk4oc87orj2nd0ydczjffyvyuzxr2mgs5d22ba45zpyzk958gn1hes77aj0jij8ktmxhv1l8s92761qfa1gft2r03tb14wufq5r5vbwh5l44h2msnuk1s9rcs735uq2ti3nrf3lzn10cwn6wrh3i46317i5g7w7sj9v4quzhqk9fb7scehq4xab5ffd2les8cfgknqs5faeylhcct5vv7ya7h7nsys3x7v2lxqgdx7m9j1k0j1mavft6sbdlct1yfrkm87mz2qjr9kphk8rlbev65w728fw0k6w134dunwgubgofgsp1eoglzwh36wjjqzmkgi8mc9yp9nxmkiwmvgqkjo9i2qzsnnp46u9v650nixy23bl4yi35l9z2jxktr5mudgnp5niaj5cjbsdfkkgluvxqd4twmygndxrrx2p45tkh4u5w36lo6h3zzf62n54ahfd167tj95kwhoge0u1aulj84fgji6dazc0pv3bwt7thtm3fu64urv3ate70guj51mf888lit2wd18t1upotn2rlaczfwcz7dy5ihc0qj03xj3nmflfiivzs9vuknthpppotzb3m1wc7l99xwvpsf4bjoimngsjn8584tkdh7gawck1icekltv05qtv8swbjj8wwzw2s78cw2umkg9piwl662i39scm84w9fahzws8i468vsshthux01fe5t19gp9iq3g3n05x4zskkuvz31hfszssmc3rqqn67jchivm3zesmhkmpfr4g3vfw3l3buks8f1om0mrv8nz5c53efzxz3axdglr02p9rsora30elxhj7573xudq6z1cld2rvg1p5xe2ay7a9pd4e1hh3zdik6wodk0fcmyys0hsg6717flui5m902cd0kg8fxsdfp5qpey5bgop4zboqwvwjm24g7ltcagq62zp7ibrohk27ygnj4027zwn1fq84s3gbm93l2bgnuhhfnnl8px1gw8wcbuzp39hsfvvycudxef7fhipx2pwr2r319va9j1bbivsa2zqzno5xwjb5wft6krb9tjf7lk263bssb0zmqsn63pf7kfhbh4tkgnex3dzl4ujmk99mwrl3bz2tixilr4a6ozmln8ipgfe25nxru9fg6eulgo53v8q26opsb0mtigb9wm0h0rl3ub0d9jg7l4kbukru4d0qfpa5ij4viellscrr8bjcxyrc0v2fauerk67lcwlfhlsdvajfh08382956844xcq0pm0jjhosfecrnyuoubf2t0xokt0y3h2alodcooolt7vr57glakk01xd3afczl36y2qbhtktbe9a8mptlrgnfqkmiurgnbyclxyw9tc207y4pjhypf2yktygpnnwbjz4qyqari5smlthjcg3of3p4o4q2l1ujpl2sph6qz48tbl4neiq8nd8hi1l9455x1hizzhyboee2asubb1h6pelqq86ohcnkjxraquxzl5yv0zqbtdtfuzy88pv6ko3ncsqxtnoq01e4e7rp44qyxhdrbnp2eoar2avbruv4fa7zz5rf6fvoxeilmes2x5h49qn2up4x9l4mmjxx9oi92ocg6cj8ps9ipzgzoyz197pao59h60lcc73lz8bqcxsfq7eeklxnstpygs2c5fj69hbft2kc8jnuicfrduym1nd6aoft2a5zspvbu7byso97m7ym1786ryhw2tomyk5w5zoan8qci1bfy621ta5nbkduiv9jw2fzms9pc36uh6ykgnm0atjlv4q3c5kgc9l5hmrdt4rfjououag4mhq3oe5u66r811w1wy3xtgcak6hbof0eyoqlkkwk7fply55uymmn1xn3x8vq8cdybg58ttrp8aa4i6v5ytth9hdw4viamio6k372ij4lcfg9806yud8kobgwiud94kii18j5whthgqrzkgfoqe6im1hhe2826q9d2nyipirzz8tg9iwvtpi7zuvp2wvec67x3aqhszt5w4ksf3n8iikf18f0giwrha2sves4u3',
                        expiredAccessToken: 770659116,
                        expiredRefreshToken: 369138264,
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
                    id: '421a63c8-b60d-4076-9c02-ee0c7f7075ef',
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