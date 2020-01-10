export class LoginResult {
  access_token: string;
  roles: string[];
}

export class UpdatePasswordDto {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}
