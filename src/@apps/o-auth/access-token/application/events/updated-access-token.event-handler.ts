import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAccessTokenEvent } from './updated-access-token.event';

@EventsHandler(UpdatedAccessTokenEvent)
export class UpdatedAccessTokenEventHandler implements IEventHandler<UpdatedAccessTokenEvent>
{
    handle(event: UpdatedAccessTokenEvent)
    {
        // console.log('UpdatedAccessTokenEvent: ', event);
    }
}