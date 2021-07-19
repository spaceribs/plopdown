import { LoggerService } from '@plopdown/logger';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  mdiRefresh,
  mdiAlertCircle,
  mdiUpload,
  mdiPencil,
  mdiFileMultiple,
  mdiTrashCan,
} from '@mdi/js';
import { of, Observable, Subscription } from 'rxjs';
import { Remote, RemotesService, UnsavedRemote } from '@plopdown/remotes';

@Component({
  selector: 'plopdown-remotes',
  templateUrl: './remotes.component.html',
  styleUrls: ['./remotes.component.css'],
})
export class RemotesComponent implements OnInit, OnDestroy {
  public loadingRemotes$: Observable<boolean>;
  public remotes$: Observable<Remote[]> = of([]);
  public showEditor = false;
  public editingRemote: Remote | null = null;
  private readonly subs = new Subscription();
  public confirmReset = false;

  public mdiRefresh = mdiRefresh;
  public mdiAlertCircle = mdiAlertCircle;
  public mdiUpload = mdiUpload;
  public mdiPencil = mdiPencil;
  public mdiFileMultiple = mdiFileMultiple;
  public mdiTrashCan = mdiTrashCan;

  constructor(
    private remotesService: RemotesService,
    private logger: LoggerService
  ) {
    this.remotes$ = remotesService.getRemotes();
    this.loadingRemotes$ = remotesService.getLoading();
  }

  ngOnInit(): void {
    this.remotesService.refreshRemotes();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public refreshRemotes() {
    this.remotesService.refreshRemotes();
  }

  public createRemote() {
    this.editingRemote = null;
    this.showEditor = true;
  }

  public editRemote(remote: Remote) {
    this.editingRemote = remote;
    this.showEditor = true;
  }

  public closeEdit() {
    this.showEditor = false;
  }

  public addOrUpdateRemote(remote: Remote) {
    if (remote['_id'] != null) {
      const updateSub = this.remotesService
        .updateRemote(remote as Remote)
        .subscribe({
          next: (res) => {
            this.logger.debug('Remote Updated', res);
            this.closeEdit();
          },
          error: (err) => {
            this.logger.error('Error Updating Remote', err);
          },
        });
      this.subs.add(updateSub);
    } else {
      const addSub = this.remotesService
        .addRemote(remote as UnsavedRemote)
        .subscribe({
          next: (res) => {
            this.logger.debug('Remote Added', res);
            this.closeEdit();
          },
          error: (err) => {
            this.logger.error('Error Adding Remote', err);
          },
        });
      this.subs.add(addSub);
    }
  }

  public removeRemote(remote: Remote) {
    const removeSub = this.remotesService.removeRemote(remote).subscribe({
      next: (res) => {
        this.logger.debug('Remote Removed', res);
        this.closeEdit();
      },
      error: (err) => {
        this.logger.error('Error Removing Remote', err);
      },
    });
    this.subs.add(removeSub);
  }

  public resetAllRemotes() {
    if (this.confirmReset !== true) {
      this.confirmReset = true;
      setTimeout(() => {
        this.confirmReset = false;
      }, 3000);
      return;
    }

    const resetSub = this.remotesService.resetRemotes().subscribe({
      next: (res) => {
        this.logger.debug('All Remotes Reset', res);
        this.closeEdit();
      },
      error: (err) => {
        this.logger.error('Error Resetting All Remotes', err);
      },
    });
    this.subs.add(resetSub);
  }
}
