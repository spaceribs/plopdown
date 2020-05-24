import { Subject, ReplaySubject, Observable, from } from 'rxjs';
import { BrowserRefService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { DevtoolsRefModule } from './devtools-ref.module';
import { switchMap, shareReplay } from 'rxjs/operators';

type ExtensionPanel = browser.devtools.panels.ExtensionPanel;

@Injectable({
  providedIn: DevtoolsRefModule
})
export class PanelsService {
  private devtoolsPanels: typeof browser.devtools.panels;
  private createPanel$: Subject<[string, string, string]> = new ReplaySubject(
    1
  );
  private panel$: Observable<ExtensionPanel>;
  private panelShown$: Observable<Window>;
  private panelHidden$: Observable<null>;

  constructor(browserRef: BrowserRefService) {
    this.devtoolsPanels = browserRef.getBrowser().devtools.panels;

    this.panel$ = this.createPanel$.pipe(
      switchMap(([panelName, icon, path]) => {
        return from(this.devtoolsPanels.create(panelName, icon, path));
      }),
      shareReplay(1)
    );

    this.panelShown$ = this.panel$.pipe(
      switchMap(panel => {
        return new Observable<Window>(observe => {
          function callback(window: Window) {
            observe.next(window);
          }

          panel.onShown.addListener(callback);

          return () => {
            if (panel.onShown.hasListener(callback)) {
              panel.onShown.removeListener(callback);
            }
          };
        });
      })
    );

    this.panelHidden$ = this.panel$.pipe(
      switchMap(panel => {
        return new Observable<null>(observe => {
          function callback() {
            observe.next(null);
          }

          panel.onHidden.addListener(callback);

          return () => {
            if (panel.onHidden.hasListener(callback)) {
              panel.onHidden.removeListener(callback);
            }
          };
        });
      })
    );
  }

  create(panelName: string, icon: string, path: string) {
    this.createPanel$.next([panelName, icon, path]);
  }

  getShown() {
    return this.panelShown$;
  }

  getHidden() {
    return this.panelHidden$;
  }
}
