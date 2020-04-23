import * as ZSchema from 'z-schema';

import * as PlopdownFileV1Schema from './plopdown-file-v1.schema.json';

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

    ZSchema.registerFormat('uuid', function(str) {
      const UUIDregex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      return UUIDregex.test(str);
    });

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
}
