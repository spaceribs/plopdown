import { Observable, Subscription } from 'rxjs';
import { PanelsService } from '@plopdown/devtools-ref';
import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';

@Component({
  selector: 'plopdown-root',
  template: 'plopdown-devtool',
})
export class AppComponent implements OnInit, OnDestroy {
  private panelHidden$: Observable<null>;
  private panelShown$: Observable<Window>;
  private subs: Subscription = new Subscription();

  constructor(
    private panels: PanelsService,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    this.panelHidden$ = this.panels.getHidden();
    this.panelShown$ = this.panels.getShown();

    const panelHiddenSub = this.panelHidden$.subscribe({
      next: () => {
        console.log('Panel Hidden');
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(panelHiddenSub);

    const panelShownSub = this.panelShown$.subscribe({
      next: () => {
        console.log('Panel Shown');
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(panelShownSub);

    this.panels.create(
      'Plopdown Editor',
      '/icons/128.png',
      '/devtool-panels/index.html'
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
