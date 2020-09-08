import { WindowRefService } from './window-ref.service';
import { Injectable } from '@angular/core';
import { WindowRefModule } from './window-ref.module';
import { Observable } from 'rxjs';
import { map, mapTo, shareReplay, startWith, tap } from 'rxjs/operators';

@Injectable({
  providedIn: WindowRefModule,
})
export class LocationService {
  private location: Location;
  private hashChange$: Observable<Event>;
  private popStateChange$: Observable<Event>;

  constructor(windowRef: WindowRefService) {
    this.location = windowRef.getLocation();
    this.hashChange$ = windowRef.getHashChange();
    this.popStateChange$ = windowRef.getPopStateChange();
  }

  public getHash(): Observable<string> {
    return this.hashChange$.pipe(
      startWith(this.location.hash),
      map(() => this.location.hash),
      shareReplay(1)
    );
  }

  public getLocation(): Observable<Location> {
    return this.popStateChange$.pipe(
      mapTo(this.location),
      tap((loc) => console.log('stateChange', loc)),
      startWith(this.location),
      shareReplay(1)
    );
  }
}
