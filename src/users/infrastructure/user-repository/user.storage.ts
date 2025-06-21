import { Service, Token } from 'typedi';
import { BehaviorSubject, defer, Observable, of } from 'rxjs';
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
    console.log('>> resetUserLimit::', userId);

    return defer(() => {
      const users = this.usersData.getValue();
      const allUsers = users.all;

      const user = allUsers.get(userId);
      allUsers.set(userId, {
        ...user,
        previousProgress: 0
      });

      return of(this.usersData.next(allUsers));
    });
  }

  setState(
    users: UserContext[],
  ): Observable<void> {

    return of(this.usersData.next(users));
  }

  setUser(
    user: UserContext,
  ): Observable<void> {
    console.log('>> setUser::', user);

    return defer(() => {
      const users = this.usersData.getValue();
      const allUsers = users.all;

      allUsers.set(user.id, {
        ...user.data,
      });

      return of(this.usersData.next(allUsers));
    });
  }

  selectAll(): Observable<UserContext[]>{
    return this.usersData.asObservable();
  }

  private usersData: BehaviorSubject<any> =
    new BehaviorSubject<any>({
      all: new Map<number, UserContext>([]),
    });
}