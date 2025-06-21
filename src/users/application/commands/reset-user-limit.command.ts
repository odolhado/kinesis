import { Observable } from 'rxjs';

export interface ResetUserLimitCommandPort {
  resetUserLimit(command: ResetUserLimitCommand): Observable<void>;
}

export class ResetUserLimitCommand {
  constructor(
    public readonly id: string
  ) {}
}