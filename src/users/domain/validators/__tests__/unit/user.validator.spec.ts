import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-building';
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator';

let sut: UserValidator;

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });
  describe('NameField', () => {
    it('invalidation cases for name field', () => {
      // biome-ignore lint/suspicious/noExplicitAny: purposefully testing invalid input
      let isValid = sut.validate(null as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors.name).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({ ...UserDataBuilder({}), name: '' });

      expect(isValid).toBeFalsy();
      expect(sut.errors.name).toStrictEqual(['name should not be empty']);

      // biome-ignore lint/suspicious/noExplicitAny: purposefully testing invalid input
      isValid = sut.validate({ ...UserDataBuilder({}), name: 10 as any });

      expect(isValid).toBeFalsy();
      expect(sut.errors.name).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({ ...UserDataBuilder({}), name: 'a'.repeat(256) });

      expect(isValid).toBeFalsy();
      expect(sut.errors.name).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ]);
    });

    it('valid cases for name field', () => {
      const props = UserDataBuilder({});
      const isValid = sut.validate(props);

      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });
  });

  describe('EmailField', () => {
    it('invalidation cases for email field', () => {
      // biome-ignore lint/suspicious/noExplicitAny: purposefully testing invalid input
      let isValid = sut.validate(null as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors.email).toStrictEqual([
        'email should not be empty',
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({ ...UserDataBuilder({}), email: '' });

      expect(isValid).toBeFalsy();
      expect(sut.errors.email).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ]);

      // biome-ignore lint/suspicious/noExplicitAny: purposefully testing invalid input
      isValid = sut.validate({ ...UserDataBuilder({}), email: 10 as any });

      expect(isValid).toBeFalsy();
      expect(sut.errors.email).toStrictEqual([
        'email must be an email',
        'email must be a string',
        'email must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        ...UserDataBuilder({}),
        email: `${'a'.repeat(256)}@mail.com`,
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors.email).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ]);
    });

    it('valid cases for email field', () => {
      const props = UserDataBuilder({});
      const isValid = sut.validate(props);

      expect(isValid).toBeTruthy();
      expect(sut.validatedData).toStrictEqual(new UserRules(props));
    });
  });
});
