import { Resolver, Query, Context } from '@nestjs/graphql';
import { IamFindMeAccountHandler } from '../handlers/iam-find-me-account.handler';
import { IamAccount } from './../../../../graphql';

@Resolver()
export class IamFindMeAccountResolver
{
    constructor(
        private readonly handler: IamFindMeAccountHandler,
    ) {}

    @Query('iamFindMeAccount')
    async main(@Context() context): Promise<IamAccount>
    {
        return await this.handler.main(
            context.req.headers.authorization,
        );
    }
}