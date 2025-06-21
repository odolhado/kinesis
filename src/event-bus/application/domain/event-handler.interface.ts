import { Observable } from 'rxjs';
import { type EventType } from './event.type';

export interface EventHandlerInterface<T> {
  handle(event: EventType<T>): Observable<void>;
  doesFit(event: EventType<T>): boolean;
}
