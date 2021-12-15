var express = require('express');
var app = express();

module.exports = {
    HOST: app.get('env') === "production" ? "112.74.92.88" : 'localhost',
    USER: app.get('env') === 'production' ? "dms" : 'root',
    PASSWORD: app.get('env') === 'production' ? "123456CHUNyang." : '12345678',
    DB: "mysql",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};