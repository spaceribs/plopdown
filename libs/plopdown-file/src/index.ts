export * from './lib/plopdown-file.module';
export * from './lib/plopdown-file.service';
export * from './lib/plopdown-file.model';

export { PlopdownInfoSchema } from './schema/cues/info.schema';
export { PlopdownPlopSchema } from './schema/cues/plop.schema';

import * as InfoSchema from './schema/cues/info.schema.json';
import * as PlopSchema from './schema/cues/plop.schema.json';

export { InfoSchema, PlopSchema };
