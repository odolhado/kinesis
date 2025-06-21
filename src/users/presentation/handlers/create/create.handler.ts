import { Container, Service, Token } from 'typedi';
import { Observable } from 'rxjs';
import { type EventType, type EventHandlerInterface } from '../../../../event-bus/application';
import { KinesisEventType, UserLimitCreatedPayload } from '../../../../kinesis/application';
import { USER_LIMIT_COMMAND } from '../../../application/state/user.state';
import {
  CreateUserLimitCommand,
  CreateUserLimitCommandPort
} from '../../../application/commands/create-user-limit.command';

export const CREATE_USER_LIMIT_HANDLER = new Token<EventHandlerInterface<UserLimitCreatedPayload>>(
  'CREATE_USER_LIMIT_HANDLER',
);

@Service(CREATE_USER_LIMIT_HANDLER)
export class CreateUserLimitHandler implements EventHandlerInterface<UserLimitCreatedPayload> {

  handle(event: EventType<UserLimitCreatedPayload>): Observable<void> {
    console.log('> CreateUserLimitHandler - ', event.payload);
    const commandService = Container.get<CreateUserLimitCommandPort>(USER_LIMIT_COMMAND);

    return commandService.createUserLimit(
      new CreateUserLimitCommand( event.type, event.payload)
    );
  }
  doesFit(event: EventType<UserLimitCreatedPayload>) {
    return event.type === KinesisEventType.USER_LIMIT_CREATED
  }
}
