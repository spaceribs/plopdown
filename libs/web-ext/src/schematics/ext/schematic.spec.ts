import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { WebExtSchematicSchema } from './schema';

describe('web-ext schematic', () => {
  let appTree: Tree;
  const options: WebExtSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@plopdown/web-ext',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('webExt', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
