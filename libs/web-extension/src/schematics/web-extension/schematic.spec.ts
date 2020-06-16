import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { WebExtSchematicSchema } from './schema';

describe('web-extension schematic', () => {
  let appTree: Tree;
  const options: WebExtSchematicSchema = {
    name: 'test',
    home: 'test',
    desc: 'test',
  };

  const testRunner = new SchematicTestRunner(
    '@plopdown/web-extension',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync('web-extension', options, appTree)
        .toPromise()
    ).resolves.not.toThrowError();
  });
});
