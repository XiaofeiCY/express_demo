var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');

const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var birdRouter = require('./routes/bird');
var turorialRouter = require('./routes/turorial.routes');
var todoListRouter = require('./routes/todoList.router');
var todoUserRouter = require('./routes/todoUser.router');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// 配置解析请求体，JSON请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('chunyang_cookie'));

app.use(session({
    secret: 'chunyang_cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 1000  // 有效期，单位是毫秒
    }
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/bird', birdRouter);
app.use('/api/turorial', turorialRouter);
app.use('/api/todo', todoListRouter);
app.use('/api/todo', todoUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
