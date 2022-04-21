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
                        id: 'b91d9e40-b903-4c09-96f2-29aa3cad60d9',
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
            .get('/o-auth/client/find/22e803a4-b41a-4509-8299-9ddd7866cf01')
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
                ...{ id: '43da3263-255c-49db-b169-14379eef4bad' },
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
                name: 'Generic Fresh Gloves',
                secret: 'hs27bzc4qp8kq2r0lxg4a024v7kbizcfnkvvd0b0e6gikbsr41n0ezfvickh5h7xy0e7enlgs60aulrqzv1dcn24i',
                authUrl: 'giw3ddjoj355vihbn91o8h2q37zzh2gffttqxjp5pw38fgdgewvgsth05o91xzo65uo5e20vspw7vaa8dnf42vrf0pv849tr0uwgigtullgz41fy2231th3dru5wp3gv9g4g078f6oumqarpprda4ak1wheyvfvtnixktw6vw1vbm9uilcv82h779vdfgh0tzomnwgsku6xnqg5zm7pmeq2qpd3b8e4ye017kha69rgai07gxu5bdb58eeoyv78235sg4pz8t0jno0bhszsmto4du3nom4ne4sbbtg1pxxwvn2j4kblccfima7he3xtv45wjcqb8jzf4n8871j1h08ne94vjuj1xfn8wbk0duc64vca8kx07jn2vae5lshau2d8czjplro082z0fywgs43ypzwgc3li4z1q3gt95lxfqj588kpq61cg950zfrc65b9dd5enzeubhmkr3447q952pyxilp6moj020jaw0j3x1ioe166788illdilfx0ega6vo7vf1vaovimgpx1zchnclho07knt7tnc01cciz0tfju9tx4bd286own9o9akzbra6f7ic0fjsqfug849giv1fwjt1ivqxwilep2wyeiwh04a40usban8m7oxw0na5uopk9mrpafplqxpix2wkkcwyyygci7rg4e1rndo2l2tqtbhwk9gcka2q2b1jbw6wm10kkxury8hi6f1dypivm9hr08jk1wm2kdpohkvo3ksgqzw53o30m48n6k9ouowedeojvoo02pfyohjioyvbdc9i9su9oui0mvg46cot91xurxf46m6bxcq8chtpyzqzyak53cm3qnk83ng3qmiym2gmc8fw1qp2qjnkat25tgref4x08adc639tk0r3i99g5h2fcmuebhrvp23l93oz898mlvf3h65v1au43mizyohxcwkl4d27h0miqbb5glg5o2spc9ih9o79i7thik3j2yodbyv1rv2b2715p1r6bz7lwezgxd4wxsr1mf4yu6q0sln8zn7jdgyv2bekrtactju39169irjq2xp4a7nhyg377q6f0k6a84krcvd89euwh9h706ohq8cs0mo12q4ztxptfzf6w1mk33lur95k2a03cifedhosgmhvivunn026enmf0u5zrq1k8z9zfe157qsuu8fjldeoxzgc7wrvkc38bjqts3gwpd4h94d5o7groq6ulbmujhgt3vu30pk8rvro228xttlnybg8wef8ml7kjwzpxr2pa44os2btg4njfug5z4so40wt7aqirrmqugj2iwjw0cs4w1ztva4k0xr4l0bm0al3nuicjtpm28tk1g96g0222zkppii95l0zw5vcvloc4tvytxv4tm5tl6djudvs7ms4w5fkwg8d1asfixr7n9khcyplx1xy54a45uq2c7x5a8l89c4yuwsvir5gtjjfkb9rqbz8qb67loa1lz67ovym4e72aljmvlynsxqziqrn9vjnyid85kxhzancatiee5qhkgbyrcf7qwgbjoodvnpr9qes73dk3csn72dd9hq9u1x9ckj4ze2s33mthudwwznfctpom0gn4bydq98zi9n25ql8cx3mx0fc02193npqtpa9g9t5pk7qtxa6cst5uqwskrg4q4enmwi64mgxxb6lkljj9lskdmv06xiae107gm9c6exmctejhlrl16kj2rpok0ujtd1rw1dxd97ssxq9km33jpbg05t5lsz3fc5tb0agartfjeeriwms603czyfy9p730kaom8rslqs88o6gk14brucmf8li1msmu8fk3uyp3x1ln73hf9pdn32fgaxotb1xxlsf14c4fps2v7bkk4t9vfa4sxuivanazy7jvux4ko9rpbne7txiihtn6naszefm1p8w4qtolg3elmj3kl8viszub30okbe5la50krq8quurze4ehwcsbuw7iyts35xleafghfu3qzccfc6u4b3qfu5bmd26l4g7jh4k7u9jpemxmpm2wj11faqai4qzypq3z9nwwlp',
                redirect: 'qh9gjxotve3fbfpj6v0koey11kg6jns4ti97vajrvlanrtlp9vs6zu0uqh3iawj8fy0t0raefytkzz3b6nzhvqtm460tlvpy1u3qxoc0qrxkskymt5rsma9ymn5yvjws3wzq0anfhb0g266scctxltuhhekzd5wvmb73ndqus69id4nv1cm7v651mkpjlxid6w16vp8up1370efr2dnwrsu5ogyt08jt7v43q5c44w0tri8cc5fzprkfenvfmwqg1p175kiyccbsre5sv2pic4p268pfzqk1gujv3x5lbfwhmuxj4ai6x0o00xhi2d9bvgntqsze2d48q8tb3zq0oupjram58s4jyyuygplopl2t57278sysbkptwj0bej321ew73w8qb41lkjujd943l7k62zbaims68b3g52r25b0r305zelacamgklc8qjom60iw3t2od3j5vyurnv2xbtxux1y3k7t1i881xx1i0glsrba8aejp7fkamtq8ccy98ivr37hwn0zfjvizh2xwyj4qjbn2ec88iyt5uo4v4czmh56m3o6zs1f5synlrpk9b92v0itclnzdi57qv2z9gbws5e048z64zrjj24yfu1f07m7j71rr7ekdgtwzjyoyg5a9ftc1v4m7wfo0k2o8sqd4ipzl58tcxyrrsqdgxfyi8ej33az6158h1o26k8mz0zvs3qtn09r1zh7hcwtaltu40b1eowbhu2yfybzh1xgzldlx19lsw7dowwqal9yt5z5slieh19lbv50q47bachmapv5dvrv1osi193dtvyf52s14os6ruje39e2f52mscwcmoi39dezkphdj8vk5yl29kyb5m98ibt2489k08ak1c3h9mbkc92c6llbp23p54r7e2nt2iawzu5dcpaory6alqk2mmajg56g4vdh0obk8wfxrxzs73gx35m38467jusrssi7c90unchj3naf7qllbh32yn52karyzrnb9svl9ntzg4wjtdqbvo0hpsjsvxkvwnihwb64myhvlnkkd04n1fchq34yypkr8721ib6jnjv3kj9slicb231yt0h7xmthhl8ap860te6fdmlkyqlpg60fnuviby8u1506ftjf0qmwss7krfoydwnzutnmakxh2vny26sgzkakbsvuxluuyyqxu73qk5uvwrm1q2qapc5o186da4z28hzftt0yp2stman5vpdwu9muoyqs6ablqhwynuw0cfmxy7y4x7m5vm5kopj6wvvh8fulaygt3cx7lcmrmulayzjod6dznwkwd9mcso80552jsm4aaiqrj0lr89yflzv9fn21ae7q88s9qmxrw7ixfb3jsrrtp33bceqzw586phm95wqqdafoclobsvab4ao4cys9nneprrjzq8cb1df2pa559ol0wwqbtfrkir577acdredqjyifo2hd2ueb03fncb795kls9bpwbbenwzkdb72q1ym9zfhho3u2t0kxqpk7rw8z3fetb59gqa18l25ic8kvrn5ppb811ve9en0sj27zxu0vjc49rlx04kvrfeqqdb54lf1xfxtubplfv4o6q96gk2ki9ewyo4o72q46qrosznq2gjg920v4hqe6czltb884eszdtc4pszvrgl6hf8sjo9784ygbko4zjxnyaigs0k6uycfe3d7po7t8bc7fdqy6i5vayt0zuwksra42sg31hlvopgg5i4gavg9qrfdzznruyzewpui911qc0bsl2aslsr9hrl6mm45bc1uu0crkgtkegtidb7hnjrq516x1ca46074r2ou457couj2dgx1cmbzg7vl0c4dxgojvqojfkqp4ynwcaz6f38kppz2zaqd5lo1svoj6c8f95job0v3aoioe7yuznzodw49j4qbqwdklmhjqfvmy3ksy9whiiv16x9m41xs7b1ed3p39lrae7o4tpptqsx3kgi21t61vmlxdgz7n7ezuvqaat5maos0bgvuur5y1f30atoj0wt79006jksfxh8xbv6t6ud5y8zu32',
                expiredAccessToken: 125720636,
                expiredRefreshToken: 597415119,
                isActive: false,
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
            .delete('/o-auth/client/delete/10eb3e3f-ff1b-41ed-be9a-80e837181689')
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
                        grantType: OAuthClientGrantType.CLIENT_CREDENTIALS,
                        name: 'Practical Granite Mouse',
                        secret: '0ns73aa4ma93hvty44ews2wniydsxpuz0mlxecis7tatpfdbr5703hifjehexqtffzih3b5qrxl4gxac1d7lbvoqf',
                        authUrl: 'lgfxg5w0hqd8ug8sj44gkzx3p2hcuuj46j8zx2iojz60bcb8hyhjb1opzufqesm8mivlky3fwqa1opu7c4mg04b3liog0kzx1gdvyv89j2mro3st2y5u9hl1z5hmnvrtg9q4v222d8p0v7fb9t4mzpbv2q2ip5x0xor31ligzmdmtnyul4kuyveuojkhimp679zjr2h1n96vz88tw663gkwhrz2cpydwokyzm5foskiv15zgoyb2arv4rm0ic21hjf0z71o08mq6c1sogkbukfvdlvd12hxazoci6m0d7kkcwa2c8roxuvgbiuppu3qotebd41gzrg287ybi2932kyrvbta5r16yn2ghfsdw2a6ahj27fh77eef2frr7gycufr4wshm92rkjzytss1f5rku1z1qr2xpq1vnc2474q1puzuawkcoqorrgvr6t8c7nkrn1b697ijx3yfibqeujzmlz4944x5felny9hco1l89dsfslgnx2fsx43y2ndjfkmbh4ei3eeahaxqcdy1upo3x8ihcsz34m32he2vbrxk4osyc44l3buxan9hye57sgajvx6pnbruhlhwygxvndlwc5fobr4oeqxy04pnp122pzd9io9nttck471zmn06ixrvilas36b9ab1pozec1o6k2xwp4vr9yt5bnty9cvc1cfpiavv74e3pqix5ifnvkq97yfqwyx3iyy9qmi11uhos7qfscln5pwuteki1hzgpj84lczx1bv602e9l4kd9sg75l8r8gyqefbixce8u6ryggqc9k9miaxa5v3eqrx9kho6576ubuz05szababaguw81cbavy925w1xj7s1uib4e5e3j5pk3rslt6x1d8r11vhp5k8u0fgco99ki8udmi817jhcv6v5f9a34ox3pla8mqawf3yxf3b9z0jgp8p9yrryicgo80dba5pbri0oa5bgk1kjv63je6kd3xn4bzvvd2lab52z1syjgzhcjbpjghk3unw9pm7tpeu5j7ercx5jq8hhj4meqjy2fww7srtn2umcxxar3y2wic6uwfnt2n0prhqln3pbp7ux6712atuu8vjbii45n8tt68utl57skxc496xebf8n570bah2qxjg3mzi4vxtncalhekrpaivl9znqc0yetwujqsyab2s0mripbqcuo89177hm70if673e5htua4t4nkjwgjjnpzd5fkzhh133alrah05myz9lgstpsxowzprg5s021dcyqdo6azk4f16nllm9zn8lsyfnjqd5vz1kxfl3zzznydcqtcfi7ah21pq4w7shjdnhwl13mxo9vj796z78wcrd5nmc675o4l6wm4szzv5683bk7l5z7hzhj3hq8umpjzufyg4uopenmy4stnpdnce6t2h1b2ym1awdqqs39myoop64bl1nun4g6eiy3zslzeadkgncbrx0xng8ck5419tq4hqu0v6zjpu8psgscbtbev8qkwevc53bju6ve0nxs3atielznj52r7qgzkaf4d4deibp2hg7qbsvmrmohrz4c34qp7550khu7dvr899ikc4oqo7j8rrh4e0rlqvnvuzwm7kln3ob3x3ve6adlfqq0hnmtywevebynmxjt3pf6lok54jz5o7xh4xa94ta7vbxy6vqilhg0x8kmme60p973ti53zz9hb3d7koof4q7xr6do9f3qcsg7t0yywwic7iha44fwdztsgjg6nybyymhcu3vtv1jqbfs5mp0kib2jjco7rg3twhxds5tsc3f8i06nmypylvkv68mcjna5l07879fvs67r1t11ckvb84lvfqbil2iezgdln6mcbp1jeelpfqtz92kyprdtga2ie3eyp2h6kp1v3ftelyl89enbx23vbrrrhcf9a8gw24tt1k1n6d8xzjb6upy4jy504o6qjdjykswqoemuhp24e8422b1ggcdz6q0bc29u479vo9z4ccpbeqyewzk3drr7wfvmpy4epipobaprle8x4lhwwh8ztpixp2bu5mrzlzllm97cl',
                        redirect: '8arpt5l1ln9rfvp2kui99in7oduc8xxfyf160kzjsmvrwwqrsx1xngnr56ivzzxg6nndibhqhoypbk91pjlcqvdmj6gs16m0z4cr2gc6eeb67mf5koe3s4i62a91vqfpbz4t03kzjuun21rorm8yheedrk3n2dgyrjm0sv5rrwyhtoxnjekfh8gbz7frfft5sck15rasl4n7w4ik64skxohz5mobs0aryy7t2p4begz2ifrn9k1se7vuhf5a4f5m0fj8vcan2vwj9xbcixgkbpdg4dcb4mx4xght1ofk5ugfam7n9419cgtjhaf3pm26cfj842vewxmymrl0yavl9a2ex50lqi8bs7r7i58iqgv2lfru3v80dusfz8djwush0xnvgbs3np1p666idc23ctvcy0gwbb28dt7z09uu9kc7cqo30d38vl8qerneuhbj9t5k2hh5kybmux8lmsx66yogtdq1xpm0no6yp9mii5nl3keoj1orsjy8f2alxk38u2u3jj4k0drah7vqxqhciikmojoi5tvf895q4f0a9g20ivcwwcsfriz4jp5m18as3p27uhge6lz7fuo5m11avy6tiqayk42f9opv5idy6mschjy74diislz8ju29w4t8xh3ntl0uyjfuu6q1ocmozp5p2g31oc0s3c1pa3bjcky0pqro378i7k0bzz93njkx2zo4c9henockkswcvzdeevl60kmpqmwe7tljudijq8p87jjk3dgxw3hb97ahpyjlkersplqk4dfsu3vgyptmudxewrxa61r3jmvig3fgtd53rf5se8kddw51flnyxwqjgauv5ammgc8bf84l9heuttap0ar461wzkbinljxf2od9dmynczxmli8ll5e67fzqj2e578a2o3ike935yddbqgzsuo0eidbbyb83h62dgtiuyzioxnoo0p0o4fx3pdt6sddbvezan1uu1xm8iijc5jfn9p879q7y4k5fcoahmtg4lueawt5gjxe08s7igd1of42t6u6zatscbsoj2i5yv3rr8d98c82nl0lmy4scr8f02tinbb7s0fcqaichurgb7yo8erq2w6zg84f7eq6hoqfuyu6a6rmh0evii2n1l0x8koapotq0cbm44yo7s38g33pn8xsoxpptrsnb4x5zsfww6xmcb7a3ui1u6gnk5durnrycsxg8nnv3akn600fman6kfdhmio5m9poqwlyk09imnhrex547gc7ywa6akby5jgyyczr1rq3yg2jwg3w6hf99hgoak0tnt8xof6fh2pdu3914oxldlheuopvb6eeikucrm6jkuaf2xrh83k0y2tkx8rc5v8x9r4oxj5qldz673t6hnueexddqskueo8x3nglk17xrlgk03ura3ejaqsfpi1ibjc1eesg82qcrepacs9vmuyh1aanngv57rkes67kjuf46gy63znwfmaa5xrchdrsll7p885cf46snw35ro1962wvpoy3prad2rcgi6p6x64ej20inz8hrr4i60oxfa0zcfo5lx1d50btciod306twnc2rab9uv04bm59mtqtw9s464u5xmctwfatn406ie1itybgd8cnh83c35yohoyc8ojlaflt86aphtjzoctlvvwi3c5pn4u2yd7y259infgsukknt3spxdjb4sd74p3881p35hdcsikg6m96447itmgkwc7h110us5dryia16feww3v6pknoyw425p9dq58iy0ayj6qi064rt2enbwbe49yn8s87rbslfd9vcok209vrmmr0rnarlxsacxlbk4fc8mlwgmmbb082h9fq549gu005wksg8rdawxm9kolk7aaiegr3otu2yrftebv1q07px6amcray280bk5hn2bvo9irl1vwaw0ayljo6mmo6hdd9j59890ny04y9s04cwncdnf6vywc12c5p5icz4pbhd7c8fmzllj9qf0rcy1ryknete5kjn0tykzd8sxii8b2wzqvlx5lp8omm1heclp4ex2zrlgikv0322zww',
                        expiredAccessToken: 735743994,
                        expiredRefreshToken: 543975161,
                        isActive: true,
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
                            id: 'f8761433-429e-4af5-bcb0-6ae8c1bfbbb0',
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
                    id: '98339fb1-9b87-42a5-91b7-59e0d0075b68',
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
                        ...{ id: '7b4e2835-d6d4-405b-8c02-052270b185eb' },
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
                        name: 'Incredible Cotton Chair',
                        secret: 'fxz8g41mhme327p9sn9p8lkdygsf4grvqpvsnj3pashkg5xxiozhf3hfjeymm5rxhs8a4dwlig9of0q8iiegny6up',
                        authUrl: 'foo776gcv69mm7vh3fflshttolgyvkoz2dogba0s60irjq4rnn73188jzaoluweteipdcs3slddz7i396yfc8jx3biqyy5k9mcy4a50w5gpjucogjr5hxau6m7sxclk0kecdko3bo8mq1vf9dmt8v3ikl127crpfbpb2wh5wn7j9vdjyup11zro6x79odgzx2yohe9humdsqqzfob06mx4vymwl5p3ia7nvw28emuwdbq0ouhawlp8nt3ic9t8gzvfhgm0pjos88ztx0yelc3mieko6unyn4df8jve9t8ejc22336drgq5n7tu0ahybmrsht1g7331fsun96c2v3bi6caduz6o4ymyfd0umh62x8ggnf8xuoxi15syoq5c2abr2fn70bm9u6qj5kkq2vmdhy60su68hsqbt9l9ntgsn575wsz72q0enj6i3qombte4ia59pgkpr8mw07vz0tn2tmvuwmk4yztnp32hj1p8khqk9vtz1iwaa5n2l1o3icdjkey29jn13wf949bq3scv05e0nm50du7m58fez4xmyz93ff65bdvr3favbr5yux3cu9uqdk7qv8qnlso8ed5cbacf2ib5qxky948gmw4d6gayz2i7g0a3o6tp8xney57aekp8h6lukc526jz26bul3mtsr3twlpybncy7ldc8r2hyh9xru6yueog2pxfuns4x27nlpbw7p5tob2c56v0vqlz519h76n544fzk481dbvfpf2njhzgick2v81c8lpzc47hd484jhe6fczj7pgc952faacmwuyo9dosrfmbjxh8iiplef9wnz8svifkqzhe6nmf7m9jki8rm9pvs84isqbm32xas8ks84zyfcz3mstslr894kv55s8j3rrwma7g0mz2jvykmud77x57h4sc4yfmpaa0v1a5gnasn80ulcggz3f1ct1fyp1pc3qkne528l2t5cub85z4bhj0c3hhifd26ldcgqoli5kwcetgsa0mxq1pmbwp6j840gt5tr5s9xpsrtrjuhucryrizcw3o2fivito3cd1h75iy4h73y17clrh45yq9bfdlkv8emgd5ycztsg7b0hlxumlnv6ic5nf92dlj4pevnrh85w9y177elmt166bn0ri7pmlwk0ok5im39iknko9c6dnr44xnd08bdy3mnoedxhp0egznqti0nsi9l58uvqevk0nhk3q6w6dev5180m0y7jm0882duen4otso0y7pjntaw2lvl9k7pscapcvih4un0dq89b5cm0gm37suwr1hzerykf2upy4dzb9rhj27hr7vqs0xo6si0w67qqj6j4yhg4eblw934msascwmc1u8iuqjtrzibpg4sktff0gsgfjwecm3izq9k2chmiugr5j6ayc1tbea1xsc723bs7ewp757910tps7tzdyrftaq1pbpwjryv7y7myp9tv7pa9rh6lhbetjytzi84baxig3lxt5sq2kvh1msd5rdlxhx61kltlja8zfv177ior2aojsdpsnv4gp8iox3zmf6kignyfcl2gq6mma6eu1nlyfw0cangiv95h0r1g2y49j7v1x53xbkxjxxzsdd1w6chhvpkyn2wxp2x5pnqjzx9ivni6r4flkgzhfmycpvnpt8vhsry9wgufxqn4f83xvskcpa4frsbhcrujhlj4powv3s8cqd2rcajde03u131qxop89g990t861k2o7stt2tef1r965lbppi9t7ioainb0f88vqm3io51vuzpz4a01k6f2xpj8u9wcpqdm1kgkdegfho8o717snllce67ic0lww0jli0wf1yjmde1fyfm0uudv9q8uh3y8rh9hbwzfz0usxfyeb3ax09v3ipv36mda7vxml1n0ia0m24jcfls7yv6wfi0yqg4y8676pa69oxjeehrfd1ezp96syygnf82m4ukd4a7139l82lm9sfh1gk580l5dhp1qptqvg7jky6h1x88qso7129mlhf7zblukvn4k1i0i7is8cwzka4bl9c7wl59vum8',
                        redirect: 'yj9qn2iz73vdk4iwmg5k5ijjnl0pqpdsxl3id6hcv2hwl357w661tf3c5qd00gnbg6a58pdk9px3ispxgolwxnia1dqxu92ughwld43vcotnggnzjjek5srkubvr0llqfckmg1si9qgb4bhffvyl1czkz0ms0xemzf7ozli4nh3h3k0faqbuawbchz0koh1ror0qwv97ntn2gp5yxzx57jdwu5yc8wakl4ex2cym7jxcqspuj898yg3fwaqtuvcl4y43asaoe15em225sbv935iw0nz060vbcou7lhdsy77or7dbuy5bu4kp56k4jhawaferfqgr2dpxu5a713gbepltwnmiff8b98dst8dp2lmbhoqeqc9lm9g7jl0f7qpqmq9x5fpcq5rmzepn20m7ycnxmdt41kwblje15s3im2lpmr2bis5jffhzl0vxy3qlzf6o24jwy9ys92wyy8liua9elkz6zh60y7hb8gde3uvbkbcdxb2x92q1gt27265b6k6y2npod2mpoh52rz55u8kdhrvllzcq8j1jkywqsoydmq6i7fv812kimqxs07jnil85yc914iup72ittgot3a79eztq1y9zobesz8o3fs6o0h169rae49nylkbn0faxtljv5qk7m0lqkhlfcp194jpx0uhc2enb16xnvcb051kxnqolnnhg1ub3t334y52xupxfls6cnifyjpex0dov6t3n4k913wwm1be8fjfxn1kq3d0wmcud6er676aiwzcnd8tatynpdr196z7gj3i2w8hewkqorp2oef149lym35du0842hq60zx0qdxa77qtd4w4wg13mccx45qszbh6rq1ndxs5dqgfj5vj3lwfkhqgzuml5jo5dvcznbfh61z284v9n4jqecw5v8mo9dlv70qcvyutxxeo10mhjvca86ht8xgrcdb8m3tc86kukzzyn42tbjzru7oj576c9gca3ontf3kodpwl01qas8o20qen6ykotkbkdszrknr3vugw54fmng6p69lq6zvx3uqx0safbovkhf4o7i2zqtongx536vntbnezqq78s6hg1jdf3p2cvj7coqia1polppe5vz0rz1ts1bvi6v5o6uanu8ain30szr899qkfabksn2ck892e848wqbqc7q0v3j6y867etskzgtxijyq2ljbc342x9pcmrgt268iqgsqdmldtto3w3e52wlmp0wab726ij28suds4fg6u2sd3j2zksylghn2d5jcbxrfntity6tozfb60h0t3gdwhbf2246fmg0kauomo810j64pfbkprqgqdm2lufj42b0qm5kvqubc6448tgmaygpygerrt4h6h8fcdcutv1g08vm1rgeiz0qilr020ct78ozr3pvxdbcz05a869y5509crjd31djopqkftpg7a3u5fand338zoi79ttfzd8wq5u9y75nqkq1vb1hawqm3j0r48jqcpg53yqsz9nxj0ryhsv454tzmsdby0zgb2v0o8pdjvz3af7ob69j1ntweohjkjxkndg07pupnit0m3bkeh78c1aapvk67w3721aeomcga66bt7ef0skdwa4r810j62vspcn29vqiky24ljsq6731yq5q0mrtqlum4kvwn6ouvgky0tykiis60c8vnxqn77qvyvjm73bo3regnk2szvc2t9povp6iir3vnig4fz4nrpvqxy0qfgkp3dt5cggitajgolapzcpuo3lgybh7nfkidxwzd4q89lj9sma3nq2jco6j71odaned3g9z32t0v7vcx0975ml87dtngt9w7paez92xzzmgl5ks8d14ie2xmqqyugsuo9amjg2ejqsjjzknmrngs64myfqu5wsoyf46a08i131ru5kcm2ov2bvbhp8q3oattp0repxxgfh9iys4v0wwpsmb5jddtciqex4wibdkgwwrjk9xwykj46nab0uc3ortsqn75smui71zt4kzbv6athvaiak31ihljw02v1t368ldvy27ibj1rtrvfauv0cbe27',
                        expiredAccessToken: 446802660,
                        expiredRefreshToken: 816415157,
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
                    id: 'a3291f1f-63e5-4630-ad5e-1408b8c38ac9',
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