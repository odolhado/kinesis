import { Token } from 'typedi';
import { CREATE_USER_LIMIT_HANDLER } from './create/create.handler';
import { USER_LIMIT_CHANGE_HANDLER } from './change/userLimitChangeHandler';
import { RESET_USER_LIMIT_HANDLER } from './reset/reset.handler';
import type { EventHandlerInterface } from '../../../event-bus/application';


export class UserHandlersModule {
  static getHandlers(): Token<EventHandlerInterface<any>>[] {
    return [CREATE_USER_LIMIT_HANDLER, USER_LIMIT_CHANGE_HANDLER, RESET_USER_LIMIT_HANDLER];
  }
}