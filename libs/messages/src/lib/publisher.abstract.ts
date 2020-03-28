import { OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MessagesService } from './messages.service';
import { LoggerService } from '@plopdown/logger';
import { withLatestFrom } from 'rxjs/operators';
import { Source } from './messages.model';

export abstract class PortPublisher<C extends object> implements OnDestroy {
  protected command$: Subject<C> = new Subject();
  private subs: Subscription = new Subscription();

  constructor(
    source: Source,
    messages: MessagesService,
    logger: LoggerService
  ) {
    const commandsSub = this.command$.subscribe({
      next: command => {
        messages.sendMessage({ source, ...command });
      },
      error: err => {
        logger.error(err);
      }
    });
    this.subs.add(commandsSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
