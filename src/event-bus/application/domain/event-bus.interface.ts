import { Observable } from 'rxjs';
import { type EventType } from './event.type';
import { type EventHandlerInterface } from './event-handler.interface';

export interface EventBusInterface {
  dispatchEvent(event: EventType<any>): Observable<void>;

  registerHandlers(handlers: EventHandlerInterface<any>[]): void;
}
