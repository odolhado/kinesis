import type { EventBusInterface } from '../../event-bus/application';
import { Container } from 'typedi';
import { UserHandlersModule } from '../../users/presentation/handlers/user-handlers.module';
import { EVENT_BUS } from '../../event-bus/application/state/event-bus.state';
import { subscribeToKinesisStream } from '../../kinesis/infrastructure/utils/create-stream';


export class AppModule {
  static init(): void {
    const eventBus: EventBusInterface = Container.get<EventBusInterface>(EVENT_BUS);

    this.registerEventHandlers(eventBus);
    subscribeToKinesisStream(eventBus);
  }

  private static registerEventHandlers(eventBus: EventBusInterface) {
    eventBus.registerHandlers([
      ...UserHandlersModule.getHandlers().map(handler => Container.get(handler)),
    ]);
  }
}

