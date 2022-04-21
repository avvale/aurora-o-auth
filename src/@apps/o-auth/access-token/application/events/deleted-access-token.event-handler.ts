import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAccessTokenEvent } from './deleted-access-token.event';

@EventsHandler(DeletedAccessTokenEvent)
export class DeletedAccessTokenEventHandler implements IEventHandler<DeletedAccessTokenEvent>
{
    handle(event: DeletedAccessTokenEvent)
    {
        // console.log('DeletedAccessTokenEvent: ', event);
    }
}