const toDoList = require("../controllers/todo.controller");
var router = require("express").Router();

// 新增
router.post('/addTodo', toDoList.create)

// 获取全部
router.get('/getTodoList', toDoList.findAll)

// 编辑
router.post('/editTodoItem', toDoList.update)

// 删除
router.post('/deleteTodoItem', toDoList.delete)
module.exports = router