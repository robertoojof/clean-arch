import { validateSync } from 'class-validator';
import {
  fieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: fieldsErrors = {};

  validatedData: PropsValidated = {} as PropsValidated;

  validate(data: unknown): boolean {
    if (typeof data !== 'object' || data === null) {
      this.errors = { data: ['must be a valid object'] };
      return false;
    }

    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        if (error.constraints) {
          this.errors[field] = Object.values(error.constraints);
        }
      }
    } else {
      this.validatedData = data as PropsValidated;
    }

    return !errors.length;
  }
}
