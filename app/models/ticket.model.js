module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("tickets", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        login: {
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
        },
        status: {
            type: Sequelize.STRING
        }
    });
    sequelize.sync()
        .catch(err=> console.log(err));
    return Ticket;
};
