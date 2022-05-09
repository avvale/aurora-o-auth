/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRefreshTokenByIdCommand } from './update-refresh-token-by-id.command';
import { UpdateRefreshTokenByIdService } from './update-refresh-token-by-id.service';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateRefreshTokenByIdCommand)
export class UpdateRefreshTokenByIdCommandHandler implements ICommandHandler<UpdateRefreshTokenByIdCommand>
{
    constructor(
        private readonly updateRefreshTokenByIdService: UpdateRefreshTokenByIdService,
    ) {}

    async execute(command: UpdateRefreshTokenByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRefreshTokenByIdService.main(
            {
                id: new RefreshTokenId(command.payload.id),
                accessTokenId: new RefreshTokenAccessTokenId(command.payload.accessTokenId, { undefinable: true }),
                token: new RefreshTokenToken(command.payload.token, { undefinable: true }),
                isRevoked: new RefreshTokenIsRevoked(command.payload.isRevoked, { undefinable: true }),
                expiresAt: new RefreshTokenExpiresAt(command.payload.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}