module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("tickets", {
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
        phone: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });

    return Ticket;
};
