import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-building';
import { UserEntity, UserProps } from '../../user.entity';

describe('UserEntity unit tests', () => {
  let props: UserProps;

  let sut: UserEntity;

  beforeEach(() => {
    UserEntity.validate = vi.fn();
    props = UserDataBuilder({});
    sut = new UserEntity(props);
  });

  it('Constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled();

    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('Get name field', () => {
    expect(sut.name).toBeDefined();
    expect(sut.name).toEqual(props.name);
    expect(typeof sut.name).toBe('string');
  });

  it('Get email field', () => {
    expect(sut.email).toBeDefined();
    expect(sut.email).toEqual(props.email);
    expect(typeof sut.email).toBe('string');
  });

  it('Get password field', () => {
    expect(sut.password).toBeDefined();
    expect(sut.password).toEqual(props.password);
    expect(typeof sut.password).toBe('string');
  });

  it('Get createdAt field', () => {
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('Update user', () => {
    const newName = 'New Name';

    expect(UserEntity.validate).toHaveBeenCalled();

    sut.update(newName);
    expect(sut.name).toEqual(newName);
  });

  it('Update password field', () => {
    const newPassword = 'newPassword2';

    expect(UserEntity.validate).toHaveBeenCalled();

    sut.updatePassword(newPassword);
    expect(sut.password).toEqual(newPassword);
  });
});
