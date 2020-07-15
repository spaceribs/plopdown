import { WebMessagesService } from './web-messages.service';
import { LoggerService } from '@plopdown/logger';
import { filter, tap, map } from 'rxjs/operators';
import { Source, Command } from './web-messages.model';
import { Observable } from 'rxjs';

export abstract class PortSubscriber<C extends Command> {
  protected command$: Observable<C>;

  constructor(
    source: Source,
    messages: WebMessagesService,
    private logger: LoggerService
  ) {
    this.command$ = messages.OnMessage<C>(source);
  }

  protected filterCommand<T extends C>(command: T['command']) {
    return this.command$.pipe(
      filter((msg) => msg.command === command),
      map((msg) => msg as T),
      tap((msg) => {
        this.logger.debug('Custom Event received', msg);
      })
    );
  }
}
