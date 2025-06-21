import { Container, Service, Token } from 'typedi';
import { Observable } from 'rxjs';
import {
  KinesisEventType,
  UserLimitResetPayload
} from '../../../../kinesis/application';
import { USER_LIMIT_COMMAND } from '../../../application/state/user.state';
import {
  ResetUserLimitCommand,
  ResetUserLimitCommandPort
} from '../../../application/commands/reset-user-limit.command';
import { EventHandlerInterface, EventType } from '../../../../event-bus/application';

export const RESET_USER_LIMIT_HANDLER = new Token<EventHandlerInterface<UserLimitResetPayload>>(
  'RESET_USER_LIMIT_HANDLER',
);

@Service(RESET_USER_LIMIT_HANDLER)
export class ResetHandler implements EventHandlerInterface<UserLimitResetPayload> {

  handle(event: EventType<UserLimitResetPayload>): Observable<void> {
    console.log('> RegisterHandler - "resetAmount":', event.payload.resetAmount);

    const commandService = Container.get<ResetUserLimitCommandPort>(USER_LIMIT_COMMAND);

    return commandService.resetUserLimit(
      new ResetUserLimitCommand(event.payload.userId)
    );
  }

  doesFit(event: EventType<UserLimitResetPayload>) {
    return event.type === KinesisEventType.USER_LIMIT_RESET;
  }
}

