import type { EventBusInterface } from '../../../event-bus/application';
import { createKinesisEventStream } from './stream';
import { take } from 'rxjs';

export function subscribeToKinesisStream(eventBus: EventBusInterface) {
  createKinesisEventStream().subscribe({
    next: (event) => {
      eventBus.dispatchEvent(event).pipe(take(1)).subscribe();
    },
    error: (err) => console.error('Event stream error:', err),
    complete: () => console.log('Event stream completed')
  });
}