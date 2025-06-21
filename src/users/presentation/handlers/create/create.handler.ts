import { Service, Token } from 'typedi';
import { Observable, of } from 'rxjs';
import { type EventHandlerInterface } from '../../../../event-bus/application/domain/event-handler.interface';
import { type EventType } from '../../../../event-bus/application/domain/event.type';
import { KinesisEventType, UserLimitCreatedPayload } from '../../../../kinesis/application/domain/kinesis-event-type';

export const CREATE_USER_LIMIT_HANDLER = new Token<EventHandlerInterface<UserLimitCreatedPayload>>(
  'CREATE_USER_LIMIT_HANDLER',
);

@Service(CREATE_USER_LIMIT_HANDLER)
export class CreateUserLimitHandler implements EventHandlerInterface<UserLimitCreatedPayload> {
  handle(event: EventType<UserLimitCreatedPayload>): Observable<void> {
    console.log('> CreateUserLimitHandler - ', event.payload);

    return of(void 0);
  }
  doesFit(event: EventType<UserLimitCreatedPayload>) {
    return event.type === KinesisEventType.USER_LIMIT_CREATED
  }
}
