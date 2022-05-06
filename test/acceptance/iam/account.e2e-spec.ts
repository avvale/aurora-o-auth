/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@apps/iam/account/domain/account.repository';
import { MockAccountSeeder } from '@apps/iam/account/infrastructure/mock/mock-account.seeder';
import { accounts } from '@apps/iam/account/infrastructure/seeds/account.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { IamModule } from '@api/iam/iam.module';
import { IamAccountType, OAuthClientGrantType, OAuthCredential } from '../../../src/graphql';
import * as request from 'supertest';
import * as _ from 'lodash';

// ---- customizations ----
import { jwtConfig } from '@apps/o-auth/shared/jwt-config';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';
import { AuthModule } from '@apps/o-auth/shared/modules/auth.module';
import { OAuthModule } from '@api/o-auth/o-auth.module';
import { MockApplicationSeeder } from '@apps/o-auth/application/infrastructure/mock/mock-application.seeder';
import { OAuthCreateCredentialHandler } from '@api/o-auth/credential/handlers/o-auth-create-credential.handler';
import { IApplicationRepository } from '@apps/o-auth/application/domain/application.repository';
import { MockAccessTokenSeeder } from '@apps/o-auth/access-token/infrastructure/mock/mock-access-token.seeder';
import { IAccessTokenRepository } from '@apps/o-auth/access-token';
import { MockClientSeeder } from '@apps/o-auth/client/infrastructure/mock/mock-client.seeder';
import { IClientRepository } from '@apps/o-auth/client';
import { MockUserSeeder } from '@apps/iam/user/infrastructure/mock/mock-user.seeder';
import { IUserRepository } from '@apps/iam/user/domain/user.repository';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('account', () =>
{
    let app: INestApplication;
    let credential: OAuthCredential;
    let oAuthCreateCredentialHandler: OAuthCreateCredentialHandler;
    let applicationRepository: IApplicationRepository;
    let applicationSeeder: MockApplicationSeeder;
    let accessTokenRepository: IAccessTokenRepository;
    let accessTokenSeeder: MockAccessTokenSeeder;
    let clientRepository: IClientRepository;
    let clientSeeder: MockClientSeeder;
    let accountRepository: IAccountRepository;
    let accountSeeder: MockAccountSeeder;
    let userRepository: IUserRepository;
    let userSeeder: MockUserSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 15s by default are 5s
    jest.setTimeout(15000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                IamModule,
                OAuthModule,
                AuthModule.forRoot(jwtConfig),
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
                MockApplicationSeeder,
                MockAccessTokenSeeder,
                MockAccountSeeder,
                MockClientSeeder,
                MockUserSeeder,
            ],
        })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData                        = accounts;
        app                             = module.createNestApplication();
        oAuthCreateCredentialHandler    = module.get<OAuthCreateCredentialHandler>(OAuthCreateCredentialHandler);
        accountRepository               = module.get<IAccountRepository>(IAccountRepository);
        accountSeeder                   = module.get<MockAccountSeeder>(MockAccountSeeder);
        applicationRepository           = module.get<IApplicationRepository>(IApplicationRepository);
        applicationSeeder               = module.get<MockApplicationSeeder>(MockApplicationSeeder);
        clientRepository                = module.get<IClientRepository>(IClientRepository);
        clientSeeder                    = module.get<MockClientSeeder>(MockClientSeeder);
        accessTokenRepository           = module.get<IAccessTokenRepository>(IAccessTokenRepository);
        accessTokenSeeder               = module.get<MockAccessTokenSeeder>(MockAccessTokenSeeder);
        userRepository                  = module.get<IUserRepository>(IUserRepository);
        userSeeder                      = module.get<MockUserSeeder>(MockUserSeeder);

        // seed mock data in memory database
        await applicationRepository.insert(applicationSeeder.collectionSource);
        await clientRepository.insert(clientSeeder.collectionSource);
        await accountRepository.insert(accountSeeder.collectionSource);
        await accessTokenRepository.insert(accessTokenSeeder.collectionSource);
        await userRepository.insert(userSeeder.collectionSource);

        await app.init();

        credential = await oAuthCreateCredentialHandler.main(
            {
                username: 'john.doe@gmail.com',
                password: '1111',
                grantType: OAuthClientGrantType.PASSWORD,
            },
            'Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==',
        );
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                type: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountEmail property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                email: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountClientId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                clientId: null,
                type: IamAccountType.SERVICE,
            })
            .expect(400)
            .then(res =>
            {
                // try get client from null and get a undefined instance of null
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                type: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountEmail property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                email: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                isActive: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountClientId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ clientId: null, type: IamAccountType.SERVICE },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                clientId: '*************************************', type: IamAccountType.SERVICE,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountEmail is too large, has a maximum length of 120', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                email: '*************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountEmail is too large, has a maximum length of 120');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                isActive: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountIsActive has to be a boolean value');
            });
    });
    test('/REST:POST iam/account/create - Got 400 Conflict, AccountType has to be a enum option of USER, SERVICE', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                type: '****',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountType has to be any of this options: USER, SERVICE');
            });
    });

    test('/REST:POST iam/account/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/account/create - Got 409 Conflict, email already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8', type: IamAccountType.SERVICE },
            })
            .expect(409);
    });

    test('/REST:POST iam/accounts/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/accounts/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
                    total: accountSeeder.collectionResponse.length,
                    count: accountSeeder.collectionResponse.length,
                    rows : accountSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/accounts/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/accounts/get')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    accountSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds']))),
                );
            });
    });

    test('/REST:POST iam/account/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/find')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '32e06919-59e5-4745-9f2b-1bc26443b037',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/account/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8', type: IamAccountType.SERVICE, email: 'john.***@gmail.com' },
            })
            .expect(201);
    });

    test('/REST:POST iam/account/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/find')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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

    test('/REST:GET iam/account/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/find/e259e743-d7b2-462d-81b8-9738ec4cf8e3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(404);
    });

    test('/REST:GET iam/account/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/account/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '5d4ce994-0f65-4758-abb8-dc57280eae50' },
            })
            .expect(404);
    });

    test('/REST:PUT iam/account/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                email: 'other1@gmail.com',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/account/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/delete/028e1feb-bf33-4ac2-8fb7-865d099eb143')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(404);
    });

    test('/REST:DELETE iam/account/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(200);
    });

    test('/REST:GET iam/account/me - Got 200, AccountId belong to JWT', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/me')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('email', 'john.doe@gmail.com');
            });
    });

    test('/GraphQL iamCreateAccount - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
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

    test('/GraphQL iamPaginateAccounts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateAccounts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateAccounts).toEqual({
                    total: accountSeeder.collectionResponse.length,
                    count: accountSeeder.collectionResponse.length,
                    rows : accountSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetAccounts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetAccounts (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
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
                for (const [index, value] of res.body.data.iamGetAccounts.entries())
                {
                    expect(accountSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateAccount', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8', type: IamAccountType.SERVICE, email: 'john.***@gmail.com' },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindAccount - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
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
                            id: '025dacfa-709b-4d06-929e-e9324744d42f',
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

    test('/GraphQL iamFindAccount', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
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
                expect(res.body.data.iamFindAccount.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindAccountById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f6472639-c9f6-4f20-b3ce-2bc756f5f938',
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

    test('/GraphQL iamFindAccountById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
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
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateAccount - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'a8dd71f7-e8fd-4ba8-a032-71662226ff4a',
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

    test('/GraphQL iamUpdateAccount', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        type: IamAccountType.SERVICE,
                        email: 'other@gmail.com',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteAccountById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1fadbdf7-a644-45c6-b492-0c78d5007780',
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

    test('/GraphQL iamDeleteAccountById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
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
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindMeAccount', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query
                    {
                        iamMeAccount
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            dScopes
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamMeAccount).toHaveProperty('email', 'john.doe@gmail.com');
            });
    });

    afterAll(async () =>
    {
        await accountRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});