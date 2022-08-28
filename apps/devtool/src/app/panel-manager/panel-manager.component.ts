import { Component, ErrorHandler, OnDestroy, OnInit } from '@angular/core';
import { PanelsService } from '@plopdown/devtools-ref';
import { Observable, Subscription } from 'rxjs';
import { BackgroundSubService, DevtoolPubService } from '@plopdown/messages';

@Component({
  selector: 'plopdown-panel-manager',
  templateUrl: './panel-manager.component.html',
  styleUrls: ['./panel-manager.component.css'],
})
export class PanelManagerComponent implements OnInit, OnDestroy {
  private panelHidden$: Observable<null>;
  private panelShown$: Observable<Window>;
  private subs: Subscription = new Subscription();

  constructor(
    private panels: PanelsService,
    private errorHandler: ErrorHandler,
    private dtPub: DevtoolPubService,
    private bgSub: BackgroundSubService
  ) {
    this.panelHidden$ = this.panels.getHidden();
    this.panelShown$ = this.panels.getShown();
  }

  ngOnInit(): void {
    console.log('Initialized Panel Manager');

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
        this.dtPub.getDevRefs();
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(panelShownSub);

    this.panels.create(
      'Plopdown',
      '/icons/128.png',
      '/devtool/index.html#/files-editor'
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
