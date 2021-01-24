"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jon Doe",
          email: "jondoe@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
