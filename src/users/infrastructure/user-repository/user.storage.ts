import { Service, Token } from 'typedi';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserContext, UsersContextPort } from '../../application/ports/users.context-port';

export const IN_MEMORY_USER_STORAGE = new Token<UsersContextPort>('IN_MEMORY_USER_STORAGE');


@Service<UsersContextPort>(IN_MEMORY_USER_STORAGE)
export class InMemoryUserStorage implements UsersContextPort {

  setUserLimit(
    user: UserContext,
  ): Observable<void> {

    console.log('>> setUserLimit::', user);
    const users = this.usersData.getValue()
    this.usersData.next(users);

    return of(void 0);
  }

  resetUserLimit(userId: string): Observable<void> {
    const users = this.usersData.getValue()
    console.log('>> resetUserLimit::', userId);

    return of(void 0);
  }

  private usersData: BehaviorSubject<any> =
    new BehaviorSubject<any>({
      all: new Map<number, UserContext>([]),
    });

  setState(
    users: UserContext[],
  ): Observable<void> {

    return of(void 0);
  }

  setUser(
    user: UserContext,
  ): Observable<void> {

    console.log('>> setUser::', user);
    const users = this.usersData.getValue()

    // users.push(user.id, user.data);
    this.usersData.next(users);

    return of(void 0);
  }


  selectAll(): Observable<UserContext[]>{
    // return this.usersData.getValue();

    return of([]);
  }
}