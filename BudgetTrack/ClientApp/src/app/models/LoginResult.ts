export class LoginResult {
  access_token: string;
}

export class UpdatePasswordDto {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}
