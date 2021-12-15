module.exports = (sequelize, Sequelize) => {
    const todoUser = sequelize.define("todoUser", {
        userid: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return todoUser;
};