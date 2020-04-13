'use strict';

const { hashPassword } = require("../helpers/bcrypt.js")
const samplePassword = hashPassword("superadmin")

let sampleUsers = [
  {
    email: "superadmin@mail.com",
    password: samplePassword,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "superadmin1@mail.com",
    password: samplePassword,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: "superadmin2@mail.com",
    password: samplePassword,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
]


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Users", sampleUsers, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Users", null, {})
  }
};
