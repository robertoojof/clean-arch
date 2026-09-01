export type fieldsErrors = {
  [field: string]: string[];
};

export type ValidatorFieldsInterface<PropsValidated> = {
  errors: fieldsErrors;
  validatedData: PropsValidated | null;
  validate(data: unknown): boolean;
};

