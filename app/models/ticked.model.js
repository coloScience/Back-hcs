module.exports = (sequelize, Sequelize) => {
    const Ticked = sequelize.define("tickeds", {
        login: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.STRING
        },
        secondName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        reason: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });

    return Ticked;
};
