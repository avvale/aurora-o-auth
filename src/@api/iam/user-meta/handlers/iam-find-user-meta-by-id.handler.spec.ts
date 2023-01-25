/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

// custom items
import { IamFindUserMetaByIdHandler } from './iam-find-user-meta-by-id.handler';

// sources
import { users } from '@app/iam/user/infrastructure/seeds/user.seed';

describe('IamFindUserByIdHandler', () =>
{
    let handler: IamFindUserMetaByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindUserMetaByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<IamFindUserMetaByIdHandler>(IamFindUserMetaByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('IamFindUserByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindUserByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an user by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await handler.main(users[0].id)).toBe(users[0]);
        });
    });
});