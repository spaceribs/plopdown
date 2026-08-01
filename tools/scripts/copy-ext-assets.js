/**
 * Copies the extension's static assets (manifest.json, icons, _locales) into the
 * distribution directory that the six app bundles also build into.
 *
 * This merges into the destination rather than replacing it, so it does not matter
 * whether it runs before or after the app builds.
 *
 * Replaces the copy step that the removed @plopdown/web-extension builder performed.
 * Uses fs-extra rather than `cp -R` so the build works on Windows.
 */
const { copySync } = require('fs-extra');

const [, , source, destination] = process.argv;

if (!source || !destination) {
  console.error(
    'Usage: node tools/scripts/copy-ext-assets.js <source> <destination>'
  );
  process.exit(1);
}

copySync(source, destination, { overwrite: true });
console.log(`Copied ${source} -> ${destination}`);
