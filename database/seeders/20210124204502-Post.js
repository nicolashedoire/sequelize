"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          userId: 1,
          title: "hispotan de nu",
          content:
            "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "some dummy title",
          content:
            "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
