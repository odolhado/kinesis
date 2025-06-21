import { Observable } from 'rxjs';
import { UserLimitProgressChangedPayload } from '../../../kinesis/application';

export interface ChangeUserLimitCommandPort {
  changeUserLimit(command: ChangeUserLimitCommand): Observable<void>;
}

export class ChangeUserLimitCommand {
  constructor(
    public readonly type: string,
    public readonly payload: UserLimitProgressChangedPayload,
  ) {}
}