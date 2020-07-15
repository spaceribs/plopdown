import { OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { WebMessagesService } from './web-messages.service';
import { LoggerService } from '@plopdown/logger';
import { Source } from './web-messages.model';
import { map, tap } from 'rxjs/operators';

export abstract class PortPublisher<C extends object> implements OnDestroy {
  protected command$: Subject<C> = new Subject();
  private subs: Subscription = new Subscription();

  constructor(
    source: Source,
    messages: WebMessagesService,
    logger: LoggerService
  ) {
    const commandsSub = this.command$
      .pipe(
        tap((command) => logger.debug('Custom Event to be Published', command)),
        map((command) => {
          return messages.postMessage({ source, ...command });
        })
      )
      .subscribe({
        next: (cmd) => {
          if (cmd) {
            logger.debug('Custom Event Published');
          } else {
            logger.debug('Custom Event Not Published');
          }
        },
        error: (err) => {
          logger.error('Custom Event Pipeline Broken', err);
        },
      });
    this.subs.add(commandsSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
