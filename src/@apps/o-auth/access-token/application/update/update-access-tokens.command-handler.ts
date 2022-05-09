/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccessTokensCommand } from './update-access-tokens.command';
import { UpdateAccessTokensService } from './update-access-tokens.service';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateAccessTokensCommand)
export class UpdateAccessTokensCommandHandler implements ICommandHandler<UpdateAccessTokensCommand>
{
    constructor(
        private readonly updateAccessTokensService: UpdateAccessTokensService,
    ) {}

    async execute(command: UpdateAccessTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccessTokensService.main(
            {
                id: new AccessTokenId(command.payload.id, { undefinable: true }),
                clientId: new AccessTokenClientId(command.payload.clientId, { undefinable: true }),
                accountId: new AccessTokenAccountId(command.payload.accountId),
                token: new AccessTokenToken(command.payload.token, { undefinable: true }),
                name: new AccessTokenName(command.payload.name),
                isRevoked: new AccessTokenIsRevoked(command.payload.isRevoked, { undefinable: true }),
                expiresAt: new AccessTokenExpiresAt(command.payload.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}