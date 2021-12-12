var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log('XXX');
//   res.render('index', { title: 'Express' });
// });

// 获取todolist列表
router.get('/getList', function(req, res, next) {
  res.send('获取todolist列表');
});

// 修改单个todolist
router.post('/edit', function(req, res, next) {
  res.send('修改单个todolist');
});

// 新增单个todolist
router.post('/add', function(req, res, next) {
  console.log('@@@', req.body);
  res.send('新增单个todolist');
});

// 删除单个todolist
router.delete('/delete', function(req, res, next) {
  res.send('删除单个todolist');
});

module.exports = router;
