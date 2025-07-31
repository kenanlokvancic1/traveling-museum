export default class RegisterUserDTO {
    constructor({ name, email, password, role }) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  