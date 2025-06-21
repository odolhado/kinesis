import { EventType } from '../../../event-bus/application/domain/event.type';
import { readFileSync } from 'node:fs';
import { from, concatMap, delay, Observable } from 'rxjs';
import { resolve } from 'node:path';

/**
 * Creates an observable that emits events from a JSON file with a delay between each event
 * @param filePath Path to the JSON events file
 * @param delayMs Delay between events in milliseconds
 * @returns Observable of events
 */
export function createKinesisEventStream(
  filePath: string = './src/kinesis/events.json',
  delayMs: number = 300
): Observable<EventType<any>> {
  try {
    const fullPath = resolve(process.cwd(), filePath);
    const eventsData = readFileSync(fullPath, 'utf8');
    const events: EventType<any>[] = JSON.parse(eventsData);

    return from(events).pipe(
      concatMap(event => {
        console.log(`Event: ${event.type}`);
        return new Observable(subscriber => {
          subscriber.next(event);
          subscriber.complete();
        }).pipe(delay(delayMs));
      })
    ) as Observable<EventType<any>>;
  } catch (error) {
    console.error('Failed to create event stream:', error);
    return new Observable(subscriber => {
      subscriber.error(error);
    });
  }
}