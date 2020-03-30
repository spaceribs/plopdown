import { RuntimeService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessagesModule } from './messages.module';
import { Source } from './messages.model';
import { filter, tap, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: MessagesModule
})
export class MessagesService {
  constructor(private runtime: RuntimeService) {}

  public onMessage<C extends object>(source: Source): Observable<C> {
    return this.runtime.getOnMessage().pipe(
      filter<C>(msg => {
        return msg['source'] != null && msg['source'] === source;
      })
    );
  }

  public sendMessage(command: object) {
    return this.runtime.sendMessage(command).pipe(
      mapTo(null),
      catchError(err => of(err))
    );
  }
}
