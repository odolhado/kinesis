import 'reflect-metadata';
import { createServer, Server } from 'node:http';
import { Container } from 'typedi';
import { take } from 'rxjs';
import { type EventBusInterface } from './event-bus/application';
import { EVENT_BUS } from './event-bus/application/state/event-bus.state.js';
import { CREATE_USER_LIMIT_HANDLER } from './users/presentation/handlers/create/create.handler.js';
import { USER_LIMIT_CHANGE_HANDLER } from './users/presentation/handlers/change/userLimitChangeHandler';
import { RESET_USER_LIMIT_HANDLER } from './users/presentation/handlers/reset/reset.handler';
import { createKinesisEventStream } from './kinesis/infrastructure/utils/stream';

async function bootstrap(): Promise<Server> {
  const eventBus: EventBusInterface = Container.get<EventBusInterface>(EVENT_BUS);

  registerEventHandlers(eventBus);
  subscribeToKinesisStream(eventBus);

  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server Started!\n');
  });

  return new Promise(resolve => {
    server.listen(3000, '127.0.0.1', () => {
      console.log('Listening on 127.0.0.1:3000');
      console.log('Application started');
      resolve(server);
    });
  });
}

bootstrap().catch(err => {
  console.error('Application failed to start:', err);
  process.exit(1);
});

function registerEventHandlers(eventBus: EventBusInterface) {
  eventBus.registerHandlers([
    Container.get(CREATE_USER_LIMIT_HANDLER),
    Container.get(USER_LIMIT_CHANGE_HANDLER),
    Container.get(RESET_USER_LIMIT_HANDLER),
  ]);
}

function subscribeToKinesisStream(eventBus: EventBusInterface) {
  createKinesisEventStream().subscribe({
    next: (event) => {
      eventBus.dispatchEvent(event).pipe(take(1)).subscribe();
    },
    error: (err) => console.error('Event stream error:', err),
    complete: () => console.log('Event stream completed')
  });
}