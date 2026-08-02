import { catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BrowserRefModule } from './browser-ref.module';
import { BrowserRefService } from './browser-ref.service';
import { of, Observable, Subject, BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: BrowserRefModule,
})
export class PermissionsRequestService {
  browser: typeof browser;

  private loadPerms$: Subject<null> = new BehaviorSubject(null);
  private allPerms$: Observable<browser.permissions.AnyPermissions>;

  constructor(browserService: BrowserRefService) {
    this.browser = browserService.getBrowser();
    this.allPerms$ = this.loadPerms$.pipe(
      switchMap(() => {
        return this.browser.permissions.getAll();
      })
    );
  }

  refresh() {
    this.loadPerms$.next(null);
  }

  getAll(): Observable<browser.permissions.AnyPermissions> {
    return this.allPerms$;
  }

  contains(perms: browser.permissions.Permissions) {
    return new Observable<boolean>((observer) => {
      try {
        this.browser.permissions
          .contains(perms)
          .then((res) => {
            observer.next(res);
            observer.complete();
          })
          .catch((err) => {
            observer.error(err);
          });
      } catch (err) {
        observer.error(err);
      }
    }).pipe(
      catchError(() => {
        return of(false);
      })
    );
  }

  request(perms: browser.permissions.Permissions) {
    return from(this.browser.permissions.request(perms));
  }

  remove(perms: browser.permissions.Permissions) {
    return from(this.browser.permissions.remove(perms));
  }
}
