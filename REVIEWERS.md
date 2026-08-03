Steps to Recreate:

- Start up an Ubuntu box with Node 24 installed (24.15.0 or newer, npm 11)
  - This is tested with the `node:24` docker image. No extra tooling is needed to reproduce the
    build — `.prototools` records the exact versions we develop against (currently Node 24.19.0,
    npm 11.17.0), but nothing in the build depends on proto being installed.
  - 24.15 is the floor rather than a preference: `@angular/build` refuses to run below it.
- Run `npm ci`
- Run `npm run build:ext`
- Run `npm run build plopdown-ext`
- The extension should be available in `dist/extensions`
