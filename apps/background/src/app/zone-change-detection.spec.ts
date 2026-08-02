import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Angular 21 made zone-based change detection opt-in: without an explicit
 * `provideZoneChangeDetection()` an application bootstraps zoneless, `NgZone`
 * resolves to a no-op, and `ngZone.run()` stops scheduling change detection.
 *
 * That matters here because three services re-enter Angular from browser
 * extension callbacks that fire outside the zone -- `RuntimeService`,
 * `WebNavigationService` and `ExtStorageService` all wrap their handlers in
 * `ngZone.run()`. Lose the provider and every surface still builds, every unit
 * test still passes, and the UI silently stops updating when a message
 * arrives.
 *
 * `bootstrap-options-migration` added the provider to all eight apps during the
 * Angular 21 upgrade. This guards it against a later migration removing it.
 */
const APPS = [
  'background',
  'browser-action',
  'content-script',
  'devtool',
  'devtool-panels',
  'options',
  'testing-sandbox',
  'website',
];

const workspaceRoot = join(__dirname, '..', '..', '..', '..');

describe('zone change detection', () => {
  it.each(APPS)('%s bootstraps with an explicit zone provider', (app) => {
    const main = readFileSync(
      join(workspaceRoot, 'apps', app, 'src', 'main.ts'),
      'utf8'
    );

    // Assert against the bootstrap call, not the whole file: the import line
    // alone mentions provideZoneChangeDetection, so a file-wide `toContain`
    // still passes when the provider has been dropped from the call.
    const bootstrap = /\.bootstrapModule\(([\s\S]*?)\)\s*\n?\s*\.catch/.exec(
      main
    );

    expect(bootstrap).not.toBeNull();
    expect(bootstrap?.[1]).toContain('provideZoneChangeDetection()');
    expect(main).not.toContain('provideZonelessChangeDetection');
  });
});
