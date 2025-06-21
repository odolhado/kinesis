import 'reflect-metadata';
import { createServer, Server } from 'node:http';
import { Container } from 'typedi';
import { type EventBusInterface } from './event-bus/application';
import { EVENT_BUS } from './event-bus/application/state/event-bus.state';
import { registerEventHandlers } from './app/application/app';
import { subscribeToKinesisStream } from './kinesis/infrastructure/utils/create-stream';

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


