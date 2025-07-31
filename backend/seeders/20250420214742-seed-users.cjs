const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        user_id: 1,
        name: "Admin User",
        email: "admin@user.com",
        password: await bcrypt.hash("password123", 10),
        role: "admin",
        mobile_number: "1234567890",
        address: "123 Admin St, Admin City",
        isActive: true,
      },
      {
        user_id: 2,
        name: "Curator User",
        email: "curator@user.com",
        password: await bcrypt.hash("password123", 10),
        role: "curator",
        mobile_number: "1234567891",
        address: "124 Curator St, Curator City",
        isActive: true,
      },
      {
        user_id: 3,
        name: "Regular User",
        email: "user@user.com",
        password: await bcrypt.hash("password123", 10),
        role: "user",
        mobile_number: "1234567892",
        address: "125 User St, User City",
        isActive: true,
      },
    ];

    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.sequelize.query(`
      SELECT setval('"Users_user_id_seq"', (SELECT MAX(user_id) FROM "Users"));
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
