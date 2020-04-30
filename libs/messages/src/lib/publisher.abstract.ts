import { TabsService } from '@plopdown/browser-ref';
import { OnDestroy } from '@angular/core';
import { Subject, Subscription, forkJoin, combineLatest, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { LoggerService } from '@plopdown/logger';
import { Source } from './messages.model';
import { map, switchMap, tap, catchError, mapTo } from 'rxjs/operators';

export abstract class PortPublisher<C extends object> implements OnDestroy {
  protected command$: Subject<C> = new Subject();
  private subs: Subscription = new Subscription();

  constructor(
    source: Source,
    messages: MessagesService,
    logger: LoggerService,
    tabs?: TabsService
  ) {
    const commandsSub = this.command$
      .pipe(
        tap(command => logger.debug('Command to be Published', command)),
        map(command => {
          return { source, ...command };
        }),
        switchMap(message => {
          if (tabs) {
            return forkJoin([
              messages.sendMessage(message),
              tabs.sendMessage(message)
            ]);
          }

          return messages.sendMessage(message);
        })
      )
      .subscribe({
        next: cmd => {
          logger.debug('Command Published', cmd);
        },
        error: err => {
          logger.error('Command Pipeline Broken', err);
        }
      });
    this.subs.add(commandsSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
