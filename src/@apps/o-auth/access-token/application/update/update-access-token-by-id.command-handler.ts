/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccessTokenByIdCommand } from './update-access-token-by-id.command';
import { UpdateAccessTokenByIdService } from './update-access-token-by-id.service';
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

@CommandHandler(UpdateAccessTokenByIdCommand)
export class UpdateAccessTokenByIdCommandHandler implements ICommandHandler<UpdateAccessTokenByIdCommand>
{
    constructor(
        private readonly updateAccessTokenByIdService: UpdateAccessTokenByIdService,
    ) {}

    async execute(command: UpdateAccessTokenByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccessTokenByIdService.main(
            {
                id: new AccessTokenId(command.payload.id),
                clientId: new AccessTokenClientId(command.payload.clientId, { undefinable: true }),
                accountId: new AccessTokenAccountId(command.payload.accountId),
                token: new AccessTokenToken(command.payload.token, { undefinable: true }),
                name: new AccessTokenName(command.payload.name),
                isRevoked: new AccessTokenIsRevoked(command.payload.isRevoked, { undefinable: true }),
                expiresAt: new AccessTokenExpiresAt(command.payload.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}