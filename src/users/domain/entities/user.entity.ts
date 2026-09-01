import { Entity } from '@/shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';

export type UserProps = {
  name: string;

  email: string;

  password: string;

  createdAt?: Date;
};

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  updateName(name: string): void {
    UserEntity.validate({ ...this.props, name });
    this.name = name;
  }

  updatePassword(password: string): void {
    UserEntity.validate({ ...this.props, password });
    this.password = password;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  private set password(password: string) {
    this.props.password = password;
  }

  get createdAt(): Date {
    return this.props.createdAt as Date;
  }

  static validate(props: UserProps): boolean {
    const validator = UserValidatorFactory.create();

    return validator.validate(props);
  }
}
