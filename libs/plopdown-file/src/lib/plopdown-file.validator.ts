import validateSchema from '../schema/plopdown-file-v1.schema.js';

export class PlopdownFileV1Validator {
  public validate(file: Record<string, unknown>): boolean {
    return validateSchema(file) as boolean;
  }

  public getLastErrors() {
    return validateSchema['errors'];
  }
}
