import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const CONTENT_SCRIPT_NAME = `${browser.runtime.id}:content-script`;
const oldModule = (document as any)[
  CONTENT_SCRIPT_NAME
] as NgModuleRef<AppModule>;

if (oldModule != null) {
  console.log('Replacing Previous content-script');
  oldModule.destroy();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((module) => {
    (document as any)[CONTENT_SCRIPT_NAME] = module;
  })
  .catch((err) => console.error(err));
