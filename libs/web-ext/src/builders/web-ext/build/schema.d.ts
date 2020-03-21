import { JsonObject } from '@angular-devkit/core';

export interface WebExtBuilderSchema extends JsonObject {
  sourceDir: string;
  artifactsDir: string;
  destinationDir: string;
  asNeeded?: boolean;
  overwriteDest?: boolean;
  ignoreFiles?: Array<string>;
}
