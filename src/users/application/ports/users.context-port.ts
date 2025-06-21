import { Observable } from 'rxjs';

export interface UserContext {
  id: string;
  data: any;
}

export interface UsersContextPort {
  setState(
    users: UserContext[],
  ): Observable<void>;
  setUser(
    user: UserContext,
  ): Observable<void>;
  setUserLimit(
    user: UserContext,
  ): Observable<void>;
  resetUserLimit(
    userId: string,
  ): Observable<void>;
  selectAll(): Observable<UserContext[]>;
}
