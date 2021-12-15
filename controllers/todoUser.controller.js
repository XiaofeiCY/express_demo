const { v4: uuidv4 } = require('uuid');

const db = require("../models");
const todo = db.todoUser;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "用户名和密码必填"
        });
        return;
    }

    var condition = { username: req.body.username };

    todo.findAll({ where: condition })
        .then(data => {
            if (data.length) {
                res.status(400).send({
                    message: "该用户已存在"
                });
                return;
            } else {
                const params = {
                    userid: req.body.username + '-' + uuidv4(),
                    username: req.body.username,
                    password: req.body.password
                }
                todo.create(params)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the todoUser."
                        });
                    })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });


}

exports.findAll = (req, res) => {

    const username = req.body.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
    // var condition = { username: req.body.username };

    todo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};