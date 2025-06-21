import { Observable } from 'rxjs';
import { UserLimitResetPayload } from '../../../kinesis/application';

export interface ResetUserLimitCommandPort {
  resetUserLimit(command: ResetUserLimitCommand): Observable<void>;
}

export class ResetUserLimitCommand {
  constructor(
    public readonly id: string,
    public readonly payload: UserLimitResetPayload
  ) {}
}