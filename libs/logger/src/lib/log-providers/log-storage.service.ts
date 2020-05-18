import { LoggerConfig } from './../logger.model';
import { Injectable, OnDestroy, Inject } from '@angular/core';
import { LogProvider } from './log-provider.model';
import { LoggerModule } from '../logger.module';
import { Subscription, Subject, from } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { LoggerConfigService } from '../logger.config';

const STORAGE_KEY = 'LOGGER';
const LOG_LIMIT = 100;

@Injectable({
  providedIn: LoggerModule
})
export class LogStorageService implements LogProvider, OnDestroy {
  private appendLog$: Subject<[string, string, string[]]> = new Subject();
  private subs: Subscription = new Subscription();

  constructor(@Inject(LoggerConfigService) private config: LoggerConfig) {
    const appendedLogs$ = this.appendLog$.pipe(
      concatMap(log => {
        const logRow = [new Date().toISOString(), log[0], log[1], ...log[2]];
        console.log(logRow);
        return this.getLogs().pipe(
          map(logs => {
            logs.unshift(logRow);
            return logs.slice(0, LOG_LIMIT);
          }),
          switchMap((logs: string[][]) => {
            return this.setLogs(logs);
          })
        );
      })
    );

    const appendedLogsSub = appendedLogs$.subscribe({
      error: err => console.error(err)
    });
    this.subs.add(appendedLogsSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  debug(...messages: any[]): void {
    const logData = this.stringify(messages);
    this.appendLogs('DEBUG', logData);
  }

  log(...messages: any[]): void {
    const logData = this.stringify(messages);
    this.appendLogs('LOG', logData);
  }

  error(...messages: any[]): void {
    const logData = this.stringify(messages);
    this.appendLogs('ERROR', logData);
  }

  info(...messages: any[]): void {
    const logData = this.stringify(messages);
    this.appendLogs('INFO', logData);
  }

  warn(...messages: any[]): void {
    const logData = this.stringify(messages);
    this.appendLogs('WARN', logData);
  }

  private stringify(messages: Array<any>): string[] {
    return messages.map(message => {
      if (message instanceof Error) {
        const error = Object.getOwnPropertyNames(message).reduce(
          (memo, errorKey) => {
            memo[errorKey] = message[errorKey];
            return memo;
          },
          {}
        );

        return JSON.stringify(error);
      }

      if (message instanceof Date) {
        return JSON.stringify(message.toISOString());
      }

      return JSON.stringify(message);
    });
  }

  public getLogs() {
    return from(browser.storage.local.get(STORAGE_KEY)).pipe(
      map(keys => {
        return (keys[STORAGE_KEY] || []) as string[][];
      })
    );
  }

  public setLogs(logs: string[][]) {
    return from(
      browser.storage.local.set({
        [STORAGE_KEY]: logs
      })
    );
  }

  private appendLogs(level: string, logs: string[]) {
    const source = this.config.appName;
    this.appendLog$.next([source, level, logs]);
  }
}
