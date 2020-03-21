import { appRootPath } from '@nrwl/workspace/src/utils/app-root';
import { execSync } from 'child_process';
import { ensureDirSync } from 'fs-extra';
import { cleanup, tmpProjPath, copyNodeModules } from '@nrwl/nx-plugin/testing';
import { readFileSync, writeFileSync } from 'fs';

function runNxNewCommand(args?: string, silent?: boolean) {
  const localTmpDir = `./tmp/nx-e2e`;
  return execSync(
    `node ${require.resolve(
      '@nrwl/tao'
    )} new proj --no-interactive --skip-install --collection=@nrwl/workspace --npmScope=proj ${args ||
      ''}`,
    {
      cwd: localTmpDir,
      ...(silent && false ? { stdio: ['ignore', 'ignore', 'ignore'] } : {})
    }
  );
}

function patchPackageJsonForPlugin(npmPackageName: string, distPath: string) {
  const p = JSON.parse(readFileSync(tmpProjPath('package.json')).toString());
  p.devDependencies[npmPackageName] = `file:${appRootPath}/${distPath}`;
  writeFileSync(tmpProjPath('package.json'), JSON.stringify(p, null, 2));
}

export function runNpmInstall(silent: boolean = true) {
  const install = execSync('npm install', {
    cwd: tmpProjPath(),
    ...(silent ? { stdio: ['ignore', 'ignore', 'ignore'] } : {})
  });
  return install ? install.toString() : '';
}

/**
 * Creates a new nx project in the e2e directory
 *
 * @param npmPackageName package name to test
 * @param pluginDistPath dist path where the plugin was outputted to
 */
export function newNxProject(
  npmPackageName: string,
  pluginDistPath: string
): void {
  cleanup();
  runNxNewCommand('', true);
  patchPackageJsonForPlugin(npmPackageName, pluginDistPath);
  runNpmInstall();
}

/**
 * Ensures that a project has been setup in the e2e directory
 * It will also copy `@nrwl` packages to the e2e directory
 */
export function ensureNxProject(
  npmPackageName?: string,
  pluginDistPath?: string
): void {
  ensureDirSync(tmpProjPath());
  newNxProject(npmPackageName, pluginDistPath);
  copyNodeModules(['@nrwl']);
}
