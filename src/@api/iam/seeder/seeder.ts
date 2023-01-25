import { NestFactory } from '@nestjs/core';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';
import { SeederModule } from './seeder.module';

// sources
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { permissions } from '@app/iam/permission/infrastructure/seeds/permission.seed';
import { BoundedContextHelper } from '@app/iam/bounded-context/domain/bounded-context-helper';
import { PermissionHelper } from '@app/iam/permission/domain/permission-helper';
import { FindAccountByIdQuery } from '@app/iam/account/application/find/find-account-by-id.query';
import { CreateAccountsCommand } from '@app/iam/account/application/create/create-accounts.command';
import { accounts } from '@app/iam/account/infrastructure/seeds/account.seed';
import { CreateUsersCommand } from '@app/iam/user/application/create/create-users.command';
import { users } from '@app/iam/user/infrastructure/seeds/user.seed';
import { CreateRolesCommand } from '@app/iam/role/application/create/create-roles.command';
import { CreateRolesAccountsCommand } from '@app/iam/role/application/create/create-roles-accounts.command';
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext =>
        {
            const commandBus            = appContext.get(ICommandBus);
            const queryBus              = appContext.get(IQueryBus);
            let administratorAccount    = null;

            try
            {
                administratorAccount  = await queryBus.ask(new FindAccountByIdQuery(PermissionHelper.administratorAccountId));
            }
            catch (error)
            {
                // avoid error 404
                if (error.response.statusCode === 404) { /**/ }
            }

            if (administratorAccount)
            {
                // create bounded contexts and permissions
                await BoundedContextHelper.createBoundedContexts(commandBus, boundedContexts);
                await PermissionHelper.createPermissions(commandBus, queryBus, permissions);
            }
            else
            {
                await commandBus.dispatch(new CreateAccountsCommand(accounts));
                await commandBus.dispatch(new CreateUsersCommand(users));

                await commandBus.dispatch(new CreateRolesCommand(roles));

                // set all roles to administration account
                const rolesAccounts = roles.map(role =>
                {
                    return {
                        roleId   : role.id,
                        accountId: PermissionHelper.administratorAccountId,
                    };
                });
                await commandBus.dispatch(new CreateRolesAccountsCommand(rolesAccounts));

                // create bounded contexts and permissions
                await BoundedContextHelper.createBoundedContexts(commandBus, boundedContexts);
                await PermissionHelper.createPermissions(commandBus, queryBus, permissions);
            }
            appContext.close();
        });
    }
}
new Seeder().main();