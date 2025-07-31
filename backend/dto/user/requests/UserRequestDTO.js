export class UserUpdateRequestDTO {
    constructor({ name, mobile_number, address }) {
      this.name = name;
      this.mobile_number = mobile_number;
      this.address = address;
    }
  }
  
  export class AdminUpdateUserDTO {
    constructor({ name, mobile_number, address, role, isActive }) {
      this.name = name;
      this.mobile_number = mobile_number;
      this.address = address;
      this.role = role;
      this.isActive = isActive;
    }
  }
  