/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRefreshTokenRepository } from '../../../src/@apps/o-auth/refresh-token/domain/refresh-token.repository';
import { MockRefreshTokenSeeder } from '../../../src/@apps/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.seeder';
import { refreshTokens } from '../../../src/@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
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

describe('refresh-token', () =>
{
    let app: INestApplication;
    let repository: IRefreshTokenRepository;
    let seeder: MockRefreshTokenSeeder;
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
                MockRefreshTokenSeeder,
                TestingJwtService,
            ],
        })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData        = refreshTokens;
        app             = module.createNestApplication();
        repository      = module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        seeder          = module.get<MockRefreshTokenSeeder>(MockRefreshTokenSeeder);
        testJwt         = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ accessTokenId: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenToken property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ token: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isRevoked: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ accessTokenId: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenToken property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ token: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isRevoked: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ accessTokenId: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ isRevoked: 'true' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked has to be a boolean value');
            });
    });
    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenExpiresAt has to be a timestamp value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ expiresAt: '****' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenExpiresAt has to be a timestamp value');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/refresh-tokens/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-tokens/paginate')
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
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/refresh-tokens/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-tokens/get')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST o-auth/refresh-token/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/find')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '6323e7e3-019a-4885-a100-f4bcbd8dfc28',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/refresh-token/create', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST o-auth/refresh-token/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/find')
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

    test('/REST:GET o-auth/refresh-token/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/find/7169179e-de13-4cd3-b611-9b62df7b75db')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test('/REST:GET o-auth/refresh-token/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT o-auth/refresh-token/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                ...mockData[0],
                ...{ id: 'bf7d00b9-242d-43af-a2ee-d154ad266653' },
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/refresh-token/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                accessTokenId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                token: 'Sequi cumque cupiditate et eaque culpa commodi in. Est sit modi quasi aut hic. Commodi quo recusandae laudantium in. Neque magni quae exercitationem sint autem et qui in perspiciatis. Quae quia sint laboriosam reprehenderit ullam. Laboriosam nesciunt quia non occaecati aspernatur deleniti.',
                isRevoked: true,
                expiresAt: '2022-04-21 10:49:49',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE o-auth/refresh-token/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/delete/9838f57b-205f-4963-99ce-f9e7c406852b')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test('/REST:DELETE o-auth/refresh-token/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test('/GraphQL oAuthCreateRefreshToken - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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

    test('/GraphQL oAuthPaginateRefreshTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateRefreshTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateRefreshTokens).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetRefreshTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetRefreshTokens (query:$query)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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
                for (const [index, value] of res.body.data.oAuthGetRefreshTokens.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthCreateRefreshToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        accessTokenId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        token: 'Ut possimus aut sunt libero libero earum. Et quidem est ut distinctio dolorem dicta beatae. Et ut et atque est eveniet recusandae error. Quisquam sint in unde neque a libero et cupiditate. Non error distinctio nemo non. Quis atque perspiciatis velit eum consequatur.',
                        isRevoked: true,
                        expiresAt: '2022-04-20 16:09:06',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindRefreshToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindRefreshToken (query:$query)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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
                            id: 'c15c0930-4460-4cb4-84b1-186cd191554c',
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

    test('/GraphQL oAuthFindRefreshToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindRefreshToken (query:$query)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindRefreshTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6a78ac29-3f4c-4685-ba57-f0f94a728463',
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

    test('/GraphQL oAuthFindRefreshTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateRefreshToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateRefreshTokenInput!)
                    {
                        oAuthUpdateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: 'a0b00fbc-6880-4f21-957f-ccaa345c5b14' },
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

    test('/GraphQL oAuthUpdateRefreshToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateRefreshTokenInput!)
                    {
                        oAuthUpdateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        accessTokenId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        token: 'Qui recusandae assumenda esse voluptas. Ratione corrupti tenetur adipisci ut doloremque illum. Sunt qui non assumenda doloribus facilis deserunt amet.',
                        isRevoked: true,
                        expiresAt: '2022-04-21 06:04:49',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthDeleteRefreshTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1b777ce5-9d28-4d88-a062-feb91542c343',
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

    test('/GraphQL oAuthDeleteRefreshTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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