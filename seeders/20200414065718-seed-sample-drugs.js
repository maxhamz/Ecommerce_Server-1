'use strict';

let sampleDrugs = [
  {
    name: 'Antimo 50mg',
    description: 'Dimenhydrinate 50 mg, 1 strip @ 10 tablet.',
    category: 'otc_limited',
    image_url: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174111/OBT_tpvdcj.png",
    stock: 5000,
    price: 10000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Panadol Flu & Cough',
    description: 'Paracetamol 500 mg, Phenylephrine HCL 5 mg, & Dextromethorphan HBr 15 mg. 1 blister @ 10 tablets',
    category: 'otc',
    image_url: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174094/OBAT_BEBAS_FIX_uphnzj.png",
    stock: 5000,
    price: 12000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Antangin JRG Tablet',
    description: '1 blister @ 4 tablets',
    category: 'herbal',
    image_url: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174005/JAMU_FIX_c3l0j5.png",
    stock: 5000,
    price: 8000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Fucithalmic 10mg',
    description: 'Fusidic acid 1%',
    category: 'prescription',
    image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2017/09/hipwee-9888267_20170906021736.png",
    stock: 5000,
    price: 30000,
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
    return queryInterface.bulkInsert("Products", sampleDrugs, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Products", null, {})
  }
};