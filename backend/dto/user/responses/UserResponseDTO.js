export class UserResponseDTO {
    constructor(user) {
      this.id = user.user_id;
      this.name = user.name;
      this.email = user.email;
      this.mobile_number = user.mobile_number;
      this.address = user.address;
      this.role = user.role;
      this.isActive = user.isActive;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    }
  }
  