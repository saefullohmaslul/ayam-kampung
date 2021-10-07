export class SignupResDto {
  otp: string;

  expiredAt: Date;

  userId: string;

  phone: string;

  constructor(otp: string, userId: string, expiredAt: Date, phone: string) {
    this.otp = otp;
    this.userId = userId;
    this.expiredAt = expiredAt;
    this.phone = phone;
  }
}
