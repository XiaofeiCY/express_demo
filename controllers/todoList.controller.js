const db = require("../models");
const todo = db.todoList;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a todoList
    const params = {
        title: req.body.title,
        status: req.body.status ? req.body.status || req.body.status : '待办',
        isFav: req.body.isFav ? req.body.isFav : false
    };

    // Save todoList in the database
    todo.create(params)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the todoList."
            });
        });
};

exports.findAll = (req, res) => {
    console.log('xxxx', req.session);
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    todo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todoList."
            });
        });
};

exports.update = (req, res) => {
    // console.log('req', req);
    const id = req.body.id;

    todo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "todo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update todo with id=${id}. Maybe todo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating todoList with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.body.id;

    todo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "todoList was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete todoList with id=${id}. Maybe todoList was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete todoList with id=" + id
            });
        });
};