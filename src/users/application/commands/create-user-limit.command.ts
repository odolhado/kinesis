import { Observable } from 'rxjs';
import { UserLimitCreatedPayload } from '../../../kinesis/application';

export interface CreateUserLimitCommandPort {
  createUserLimit(command: CreateUserLimitCommand): Observable<void>;
}

export class CreateUserLimitCommand {
  constructor(
    public readonly id: string,
    public readonly payload: UserLimitCreatedPayload,
  ) {}
}