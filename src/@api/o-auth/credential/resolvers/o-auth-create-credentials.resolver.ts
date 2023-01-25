import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { Timezone } from '@aurora-ts/core';

// @apps
import { OAuthCreateCredentialsHandler } from '../handlers/o-auth-create-credentials.handler';
import { OAuthCredentials, OAuthCreateCredentialsInput } from '@api/graphql';

@Resolver()
export class OAuthCreateCredentialsResolver
{
    constructor(
        private readonly handler: OAuthCreateCredentialsHandler,
    ) {}

    @Mutation('oAuthCreateCredentials')
    async main(
        @Args('payload') payload: OAuthCreateCredentialsInput,
        @Context() context,
        @Timezone() timezone?: string,
    ): Promise<OAuthCredentials>
    {
        return await this.handler.main(
            payload,
            context.req.headers.authorization,
            timezone,
        );
    }
}