/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRefreshTokensCommand } from './update-refresh-tokens.command';
import { UpdateRefreshTokensService } from './update-refresh-tokens.service';
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

@CommandHandler(UpdateRefreshTokensCommand)
export class UpdateRefreshTokensCommandHandler implements ICommandHandler<UpdateRefreshTokensCommand>
{
    constructor(
        private readonly updateRefreshTokensService: UpdateRefreshTokensService,
    ) {}

    async execute(command: UpdateRefreshTokensCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRefreshTokensService.main(
            {
                id: new RefreshTokenId(command.payload.id, { undefinable: true }),
                accessTokenId: new RefreshTokenAccessTokenId(command.payload.accessTokenId, { undefinable: true }),
                token: new RefreshTokenToken(command.payload.token, { undefinable: true }),
                isRevoked: new RefreshTokenIsRevoked(command.payload.isRevoked, { undefinable: true }),
                expiresAt: new RefreshTokenExpiresAt(command.payload.expiresAt, {}, { removeTimezone: command.cQMetadata.timezone }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}