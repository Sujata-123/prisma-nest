// create-user.dto.ts
export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

// update-user.dto.ts
export class UpdateUserDto {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly addresses?: [];
}
