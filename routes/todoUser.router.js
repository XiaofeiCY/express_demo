const todoUser = require('../controllers/todoUser.controller');
var router = require("express").Router();

// 创建用户
router.post('/createUser', todoUser.create)

// 查询用户
router.post('/findUser', todoUser.findAll)

module.exports = router