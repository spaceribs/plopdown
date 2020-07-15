import { WindowRefService } from './../window-ref.service';
import { Injectable } from '@angular/core';
import { WindowRefModule } from '../window-ref.module';
import { Source } from './web-messages.model';
import { filter } from 'rxjs/operators';

const WEB_EVENT_NAME = 'message-86fecce0-820b-44d8-b636-1719502ed8f9';

@Injectable({
  providedIn: WindowRefModule,
})
export class WebMessagesService {
  constructor(private windowRef: WindowRefService) {}

  public OnMessage<C>(source: Source) {
    return this.windowRef.getCustomEvent<C>(WEB_EVENT_NAME).pipe(
      filter<C>((msg) => {
        return msg['source'] != null && msg['source'] === source;
      })
    );
  }

  public postMessage(cmd) {
    return this.windowRef.dispatchEvent(WEB_EVENT_NAME, cmd);
  }
}
