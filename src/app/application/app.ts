import type { EventBusInterface } from '../../event-bus/application';
import { Container } from 'typedi';
import { CREATE_USER_LIMIT_HANDLER, USER_LIMIT_CHANGE_HANDLER, RESET_USER_LIMIT_HANDLER } from '../../users/presentation';


export function registerEventHandlers(eventBus: EventBusInterface) {
  eventBus.registerHandlers([
    Container.get(CREATE_USER_LIMIT_HANDLER),
    Container.get(USER_LIMIT_CHANGE_HANDLER),
    Container.get(RESET_USER_LIMIT_HANDLER),
  ]);
}
