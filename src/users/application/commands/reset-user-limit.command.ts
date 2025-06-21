import { Observable } from 'rxjs';
import { Token } from 'typedi';

export interface ResetUserLimitCommandPort {
  resetLimit(command: ResetUserLimitCommand): Observable<void>;
}

export const RESET_USER_LIMIT_COMMAND = new Token<ResetUserLimitCommandPort>(
  'RESET_USER_LIMIT_COMMAND',
);

export class ResetUserLimitCommand {
  constructor(
    public readonly id: string
  ) {}
}