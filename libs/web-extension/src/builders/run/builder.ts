import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, of, from } from 'rxjs';
import { switchMap, mapTo } from 'rxjs/operators';
import { WebExtRunnerSchema } from './schema';
import { resolve } from 'path';
import webExt from 'web-ext';

export function runBuilder(
  options: WebExtRunnerSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return of(options).pipe(
    switchMap((opt) => {
      return from(
        webExt.cmd.run(
          {
            ...opt,
            sourceDir: resolve(opt.sourceDir),
          },
          {
            shouldExitProgram: false,
          }
        )
      ).pipe(
        switchMap((res: any) => {
          return new Observable((observer) => {
            if (res.extensionRunners && res.extensionRunners.length <= 0) {
              throw new Error('No instances running the extension.');
            }

            console.log(
              'Debugger Port: ',
              res.extensionRunners[0].runningInfo.debuggerPort
            );
            observer.next({ success: true });
            res.extensionRunners[0].registerCleanup(() => {
              observer.complete();
            });
          });
        })
      );
    }),
    mapTo({ success: true })
  );
}

export default createBuilder(runBuilder);
