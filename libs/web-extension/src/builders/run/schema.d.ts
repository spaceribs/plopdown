import { JsonObject } from '@angular-devkit/core';

export interface WebExtRunnerSchema extends JsonObject {
  artifactsDir: string;
  browserConsole: boolean;
  pref?: {
    [key: string]: boolean | number | string;
  };
  firefox: string;
  firefoxProfile?: string;
  ignoreFiles?: Array<string>;
  keepProfileChanges: boolean;
  noInput?: boolean;
  noReload: boolean;
  preInstall: boolean;
  sourceDir: string;
  watchFile?: string;
  startUrl?: Array<string>;
  target?: Array<string>;
  args?: Array<string>;

  // Android CLI options.
  adbBin?: string;
  adbHost?: string;
  adbPort?: string;
  adbDevice?: string;
  adbDiscoveryTimeout?: number;
  firefoxApk?: string;
  firefoxApkComponent?: string;

  // Chromium Desktop CLI options.
  chromiumBinary?: string;
  chromiumProfile?: string;
}
