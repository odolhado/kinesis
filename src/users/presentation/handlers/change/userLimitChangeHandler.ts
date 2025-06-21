import { Service, Token } from 'typedi';
import { type EventType, type EventHandlerInterface } from '../../../../event-bus/application';
import { Observable, of } from 'rxjs';
import {
  KinesisEventType,
  UserLimitProgressChangedPayload
} from '../../../../kinesis/application';

export const USER_LIMIT_CHANGE_HANDLER = new Token<EventHandlerInterface<UserLimitProgressChangedPayload>>(
  'USER_LIMIT_CHANGE_HANDLER',
);

@Service(USER_LIMIT_CHANGE_HANDLER)
export class UserLimitChangeHandler implements EventHandlerInterface<UserLimitProgressChangedPayload> {
  handle(event: EventType<UserLimitProgressChangedPayload>): Observable<void> {
    console.log('> UserLimitChangeHandler - ', event.payload.amount);

    return of(void 0);
  }
  doesFit(event: EventType<UserLimitProgressChangedPayload>) {
    return event.type === KinesisEventType.USER_LIMIT_PROGRESS_CHANGED;
  }
}

