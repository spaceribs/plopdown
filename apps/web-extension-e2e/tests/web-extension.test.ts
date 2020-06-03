import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('web-extension e2e', () => {
  it('should create web-extension', async (done) => {
    const plugin = uniq('web-extension');
    ensureNxProject('@plopdown/web-extension', 'dist/libs/web-extension');
    await runNxCommandAsync(
      `generate @plopdown/web-extension:webExtension ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Builder ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('web-extension');
      ensureNxProject('@plopdown/web-extension', 'dist/libs/web-extension');
      await runNxCommandAsync(
        `generate @plopdown/web-extension:webExtension ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('web-extension');
      ensureNxProject('@plopdown/web-extension', 'dist/libs/web-extension');
      await runNxCommandAsync(
        `generate @plopdown/web-extension:webExtension ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
