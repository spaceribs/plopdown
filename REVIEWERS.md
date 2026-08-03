Steps to Recreate:

- Start up an Ubuntu box with Node 24 installed (24.15.0 or newer)
  - This is tested with the `node:24` docker image. No extra tooling is needed to reproduce the
    build — `.prototools` records the exact versions we develop against (currently Node 24.19.0,
    pnpm 11.20.0), but nothing in the build depends on proto being installed.
  - 24.15 is the floor rather than a preference: `@angular/build` refuses to run below it.
- Install pnpm 11.20.0 (`npm i -g pnpm@11.20.0` is enough; the repo pins it in `.prototools`)
- Run `pnpm install --frozen-lockfile`
- Run `pnpm run build:ext`
- Run `pnpm run build plopdown-ext`
- The extension should be available in `dist/extensions`
