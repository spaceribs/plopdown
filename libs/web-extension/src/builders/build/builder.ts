import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { Observable, of, bindCallback, from } from 'rxjs';
import { switchMap, mapTo, map } from 'rxjs/operators';
import { WebExtBuilderSchema } from './schema';
import * as fs from 'fs-extra';
import webExt from 'web-ext';

const copy = bindCallback(fs.copy);

export function runBuilder(
  options: WebExtBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return of(options).pipe(
    switchMap(opt => {
      return copy(opt.sourceDir, opt.destinationDir).pipe(
        map<WebExtBuilderSchema, WebExtBuilderSchema>(() => {
          return {
            ...opt,
            sourceDir: opt.destinationDir
          };
        })
      );
    }),
    switchMap(opt => {
      return from(webExt.cmd.build(opt));
    }),
    mapTo({ success: true })
  );
}

export default createBuilder(runBuilder);
