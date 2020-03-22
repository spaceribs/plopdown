import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { Observable, of, bindCallback, from } from 'rxjs';
import { switchMap, mapTo, map } from 'rxjs/operators';
import { WebExtRunnerSchema } from './schema';
import * as fs from 'fs-extra';
import { resolve } from 'path';
import webExt from 'web-ext';

const copy = bindCallback(fs.copy);

export function runBuilder(
  options: WebExtRunnerSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return of(options).pipe(
    switchMap(opt => {
      return from(
        webExt.cmd.run(
          {
            ...opt,
            sourceDir: resolve(opt.sourceDir)
          },
          {
            shouldExitProgram: false
          }
        )
      ).pipe(
        switchMap((res: any) => {
          return new Observable(observer => {
            if (res.extensionRunners && res.extensionRunners.length <= 0) {
              throw new Error('No instances running the extension.');
            }

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
