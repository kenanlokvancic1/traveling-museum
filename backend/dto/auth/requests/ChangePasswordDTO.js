export default class ChangePasswordDTO {
    constructor({ currentPassword, newPassword, confirmPassword }) {
      this.currentPassword = currentPassword;
      this.newPassword = newPassword;
      this.confirmPassword = confirmPassword;
    }
  }
  