/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '../../../src/@apps/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenSeeder } from '../../../src/@apps/o-auth/access-token/infrastructure/mock/mock-access-token.seeder';
import { accessTokens } from '../../../src/@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// ---- customizations ----
import { IClientRepository } from '../../../src/@apps/o-auth/client';
import { MockClientSeeder } from '../../../src/@apps/o-auth/client/infrastructure/mock/mock-client.seeder';
import { AuthModule } from '../../../src/@apps/o-auth/shared/modules/auth.module';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: IAccessTokenRepository;
    let seeder: MockAccessTokenSeeder;
    let clientRepository: IClientRepository;
    let clientSeeder: MockClientSeeder;
    const jwtOptions: JwtModuleOptions = {
        secret: '1234567890',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

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
                MockAccessTokenSeeder,
                MockClientSeeder,
            ],
        })
            .compile();

        mockData            = accessTokens;
        app                 = module.createNestApplication();
        repository          = module.get<IAccessTokenRepository>(IAccessTokenRepository);
        seeder              = module.get<MockAccessTokenSeeder>(MockAccessTokenSeeder);
        clientRepository    = module.get<IClientRepository>(IClientRepository);
        clientSeeder        = module.get<MockClientSeeder>(MockClientSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);
        await clientRepository.insert(clientSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/access-tokens/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-tokens/paginate')
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
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/access-tokens/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-tokens/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST o-auth/access-token/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '6282fc20-1f44-4f79-871a-38c4ceca1ba4',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/access-token/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'c2bdb79b-033e-4751-a740-a989e8e580fc',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', 'c2bdb79b-033e-4751-a740-a989e8e580fc');
            });
    });

    test('/REST:GET o-auth/access-token/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/find/753a1eb6-41da-4455-a1d7-c2fd083572b1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/access-token/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/find/c2bdb79b-033e-4751-a740-a989e8e580fc')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', 'c2bdb79b-033e-4751-a740-a989e8e580fc');
            });
    });

    test('/REST:DELETE o-auth/access-token/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/delete/33bf0f72-e3de-4948-880c-b02d3815987f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/access-token/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/delete/c2bdb79b-033e-4751-a740-a989e8e580fc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthPaginateAccessTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateAccessTokens).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetAccessTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {
                            id
                            accountId
                            token
                            name
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
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthFindAccessToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
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
                            id: '14a8bdbe-9295-4c95-b3d4-dc84e319a512',
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

    test('/GraphQL oAuthFindAccessToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
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
                            id: 'c2bdb79b-033e-4751-a740-a989e8e580fc',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('c2bdb79b-033e-4751-a740-a989e8e580fc');
            });
    });

    test('/GraphQL oAuthFindAccessTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '55fa3020-fa08-44c7-8b4b-dda8f67b8cd7',
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

    test('/GraphQL oAuthFindAccessTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c2bdb79b-033e-4751-a740-a989e8e580fc',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('c2bdb79b-033e-4751-a740-a989e8e580fc');
            });
    });

    test('/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5eff2ece-b4f6-4ec2-8c64-c4aa05bf3cf1',
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

    test('/GraphQL oAuthDeleteAccessTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c2bdb79b-033e-4751-a740-a989e8e580fc',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('c2bdb79b-033e-4751-a740-a989e8e580fc');
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