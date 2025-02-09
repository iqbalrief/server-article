'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [];

    for (let i = 0; i < 15; i++) {
      posts.push({
        Title: faker.lorem.sentence(20), // 20 words for Title
        Content: faker.lorem.text().substring(0, 200),
        Category: faker.helpers.arrayElement(['Teknologi', 'Pendidikan', 'Kesehatan', 'Olahraga', 'Lifestyle']),
        Status: faker.helpers.arrayElement(['Published', 'Draft', 'Trash']),
        Created_date: new Date(),
        Updated_date: new Date(),
      });
    }

    await queryInterface.bulkInsert('posts', posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
