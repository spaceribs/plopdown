import { RuntimeService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessagesModule } from './messages.module';
import { Source } from './messages.model';
import { filter, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: MessagesModule,
})
export class MessagesService {
  constructor(private runtime: RuntimeService) {}

  public onMessage<C extends Record<string, unknown>>(
    source: Source
  ): Observable<C> {
    return this.runtime.getOnMessage().pipe(
      filter((msg): msg is C => {
        return msg['source'] != null && msg['source'] === source;
      })
    );
  }

  public sendMessage(command: Record<string, unknown>) {
    return this.runtime.sendMessage(command).pipe(
      mapTo(null),
      catchError((err) => of(err))
    );
  }
}
