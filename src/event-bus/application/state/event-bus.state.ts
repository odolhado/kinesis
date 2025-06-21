import { Observable, of } from 'rxjs';
import { type EventHandlerInterface } from '../domain/event-handler.interface';
import { type EventType } from '../domain/event.type';
import { type EventBusInterface } from '../domain/event-bus.interface';
import { Service, Token } from 'typedi';

export const EVENT_BUS = new Token<EventBusInterface>('EVENT_BUS');

@Service(EVENT_BUS)
export class EventBusState implements EventBusInterface {
  private handlers: EventHandlerInterface<any>[] = [];

  dispatchEvent(event: EventType<any>): Observable<void> {
    this.getHandlers<any>(event).forEach((handler: EventHandlerInterface<any>) => {
      if (handler.doesFit(event)) {
        handler.handle(event);
      }
    });

    return of(void 0);
  }

  registerHandlers<T>(handlers: EventHandlerInterface<T>[]): void {
    this.handlers.push(...handlers);
  }

  private getHandlers<T>(event: EventType<T>): EventHandlerInterface<T>[] {
    return this.handlers.filter((handler: EventHandlerInterface<any>) => handler.doesFit(event));
  }
}
