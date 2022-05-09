import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';

export class UpdateRefreshTokensCommand
{
    constructor(
        public readonly payload: {
            id?: string;
            accessTokenId?: string;
            token?: string;
            isRevoked?: boolean;
            expiresAt?: string;
        },
        public readonly queryStatement?: QueryStatement,
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}