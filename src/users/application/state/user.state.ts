import { Container, Service, Token } from 'typedi';
import { Observable, of } from 'rxjs';
import {
  ChangeUserLimitCommand,
  ChangeUserLimitCommandPort
} from '../commands/change-user-limit.command';
import { CreateUserLimitCommand, CreateUserLimitCommandPort } from '../commands/create-user-limit.command';
import { ResetUserLimitCommand, ResetUserLimitCommandPort } from '../commands/reset-user-limit.command';
import { UsersContextPort } from '../ports/users.context-port';
import { IN_MEMORY_USER_STORAGE } from '../../infrastructure/user-repository/user.storage';

export const USER_LIMIT_COMMAND = new Token<ChangeUserLimitCommandPort>(
  'USER_LIMIT_COMMAND',
);

@Service(USER_LIMIT_COMMAND)
export class ChangeUserLimitState implements CreateUserLimitCommandPort, ChangeUserLimitCommandPort, ResetUserLimitCommandPort {

  createUserLimit(command: CreateUserLimitCommand): Observable<void> {
    console.log('> createUserLimit:', command);

    return this.getUserStorage().setUser({ id: command.id, data: command.payload });
  }

  changeUserLimit(command: ChangeUserLimitCommand): Observable<void> {
    console.log('> changeUserLimit:', command);
    return this.getUserStorage().setUserLimit({ id: command.payload.userId, data: command.payload })
  }

  resetUserLimit(command: ResetUserLimitCommand): Observable<void> {
    console.log('> resetUserLimit:', command);
    return this.getUserStorage().resetUserLimit(command.id)
  }

  private getUserStorage(): UsersContextPort {
    return Container.get<UsersContextPort>(IN_MEMORY_USER_STORAGE);
  }
}



