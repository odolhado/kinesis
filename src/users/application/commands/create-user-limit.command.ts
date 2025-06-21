import { Observable } from 'rxjs';
import { Token } from 'typedi';

export interface CreateUserLimitCommandPort {
  createUserLimit(command: CreateUserLimitCommand): Observable<void>;
}

// export const CREATE_USER_LIMIT_COMMAND = new Token<CreateUserLimitCommandPort>(
//   'CREATE_USER_LIMIT_COMMAND',
// );

export class CreateUserLimitCommand {
  constructor(
    public readonly id: string,
    public readonly payload: any,
  ) {}
}