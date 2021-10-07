export class VerifyOtpResDto {
  accessToken: string;

  refreshToken: string;

  expiredIn: string;

  constructor(accessToken: string, refreshToken: string, expiredIn: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiredIn = expiredIn;
  }
}
