import { Observable } from 'rxjs';
import { Token } from 'typedi';

export interface ChangeUserLimitCommandPort {
  createLimit(command: ChangeUserLimitCommand): Observable<void>;
}

export const CHANGE_USER_LIMIT_COMMAND = new Token<ChangeUserLimitCommandPort>(
  'CHANGE_USER_LIMIT_COMMAND',
);

export class ChangeUserLimitCommand {
  constructor(
    public readonly passengers: {
      id: number;
      ageType: string;
      refPerson?: {
        readonly id: number;
        readonly ageType: string;
      };
    }[],
    public readonly offerId: string,
  ) {}
}