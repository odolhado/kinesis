import 'reflect-metadata';
import { createServer, Server } from 'node:http';
import { AppModule } from './app/application/app';

async function bootstrap(): Promise<Server> {

  AppModule.init();

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
