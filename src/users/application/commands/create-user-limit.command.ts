import { Observable } from 'rxjs';

export interface CreateUserLimitCommandPort {
  createUserLimit(command: CreateUserLimitCommand): Observable<void>;
}

export class CreateUserLimitCommand {
  constructor(
    public readonly id: string,
    public readonly payload: any,
  ) {}
}