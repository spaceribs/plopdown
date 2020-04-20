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
