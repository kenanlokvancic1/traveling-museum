export default class ResetPasswordDTO {
    constructor({ token, newPassword, confirmPassword }) {
      this.token = token;
      this.newPassword = newPassword;
      this.confirmPassword = confirmPassword;
    }
  }
  