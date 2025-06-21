
import { Service, Token } from 'typedi';
import { Observable, of } from 'rxjs';
import { type EventHandlerInterface } from '../../../../event-bus/application/domain/event-handler.interface';
import type { EventType } from '../../../../event-bus/application/domain/event.type';
import { KinesisEventType, UserLimitResetPayload } from '../../../../kinesis/application/domain/kinesis-event-type';

export const RESET_USER_LIMIT_HANDLER = new Token<EventHandlerInterface<UserLimitResetPayload>>(
  'RESET_USER_LIMIT_HANDLER',
);

@Service(RESET_USER_LIMIT_HANDLER)
export class ResetHandler implements EventHandlerInterface<UserLimitResetPayload> {
  handle(event: EventType<UserLimitResetPayload>): Observable<void> {
    console.log('> RegisterHandler - "resetAmount":', event.payload.resetAmount);

    return of(void 0);
  }
  doesFit(event: EventType<UserLimitResetPayload>) {
    return event.type === KinesisEventType.USER_LIMIT_RESET;
  }
}

