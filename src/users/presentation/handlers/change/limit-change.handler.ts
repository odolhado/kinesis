import 'reflect-metadata';
import { Inject, Service, Token, Container } from 'typedi';
import { type EventType, type EventHandlerInterface } from '../../../../event-bus/application';
import { Observable, of, take } from 'rxjs';
import {
  KinesisEventType,
  UserLimitProgressChangedPayload
} from '../../../../kinesis/application';
import {
  ChangeUserLimitCommand,
  type ChangeUserLimitCommandPort
} from '../../../application/commands/change-user-limit.command';
import { USER_LIMIT_COMMAND } from '../../../application/state/user.state';

export const LIMIT_CHANGE_HANDLER = new Token<EventHandlerInterface<UserLimitProgressChangedPayload>>(
  'LIMIT_CHANGE_HANDLER',
);

@Service(LIMIT_CHANGE_HANDLER)
export class LimitChangeHandler implements EventHandlerInterface<UserLimitProgressChangedPayload> {

  handle(event: EventType<UserLimitProgressChangedPayload>): Observable<void> {
    console.log('> UserLimitChangeHandler - ', event.payload.amount);

    const commandService = Container.get<ChangeUserLimitCommandPort>(USER_LIMIT_COMMAND);

    return commandService.changeUserLimit(
      new ChangeUserLimitCommand( event.type, event.payload)
    );
  }

  doesFit(event: EventType<UserLimitProgressChangedPayload>) {
    return event.type === KinesisEventType.USER_LIMIT_PROGRESS_CHANGED;
  }
}

