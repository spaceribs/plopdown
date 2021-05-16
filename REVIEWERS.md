Steps to Recreate:

- Start up an Ubuntu box with Node 12 installed (npm v6.14.11)
  - This is tested with the `node:12` docker image.
- Run `npm install`
- Run `npm run build web-extension`
- Run `npm run build:ext`
- Run `npm run build plopdown-ext`
- The extension should be available in `dist/extensions`
