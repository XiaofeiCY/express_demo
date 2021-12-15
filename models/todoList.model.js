module.exports = (sequelize, Sequelize) => {
    const toDoList = sequelize.define("toDoList", {
        title: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        isFav: {
            type: Sequelize.BOOLEAN
        }
    });

    return toDoList;
};