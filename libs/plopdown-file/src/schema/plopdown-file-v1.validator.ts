import * as ZSchema from 'z-schema';

import * as DegreeSchema from './types/degree.schema.json';
import * as PercentageSchema from './types/percentage.schema.json';
import * as IconSchema from './types/icon.schema.json';

import * as InfoSchema from './cues/info.schema.json';
import * as PlopSchema from './cues/plop.schema.json';

import * as PlopdownFileV1Schema from './plopdown-file-v1.schema.json';

const referenceMap = {
  'types/degree.schema.json': DegreeSchema,
  'types/percentage.schema.json': PercentageSchema,
  'types/icon.schema.json': IconSchema,
  'cues/info.schema.json': InfoSchema,
  'cues/plop.schema.json': PlopSchema
};

export class PlopdownFileV1Validator {
  private readonly validator: any;

  validate(file: object): boolean {
    return this.validator.validate(file, PlopdownFileV1Schema);
  }

  getLastErrors() {
    return this.validator.getLastErrors();
  }

  constructor() {
    this.validator = new ZSchema({});
    this.mapRemoteReferences();
    const schemaValid = this.validator.validateSchema(PlopdownFileV1Schema);

    if (schemaValid !== true) {
      const error = new Error(
        `Plopdown file schema is invalid: ${JSON.stringify(
          this.validator.getLastErrors(),
          null,
          2
        )}`
      );
      throw error;
    }
  }

  private mapRemoteReferences() {
    for (const ref in referenceMap) {
      if (referenceMap.hasOwnProperty(ref)) {
        const schema = referenceMap[ref];
        this.validator.setRemoteReference(ref, schema);
      }
    }
  }
}
