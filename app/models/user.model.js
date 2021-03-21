module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    secondName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    street: {
      type: Sequelize.STRING
    },
    house: {
      type: Sequelize.STRING
    },
    flat: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    brithDay: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
