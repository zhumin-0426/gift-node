const express = require('express');
const router = express.Router();
const DB = require('../../../modules/db');
const bodyParser = require('body-parser');
// 解析 application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// 解析 application/json
router.use(bodyParser.json());
// 登入
router.post('/dologin', function (req, res) {
    let userLoginMsg = {
        adminAccount: req.body.adminAccount,
        adminPassword: req.body.adminPassword
    }
    //数据查询
    DB.findData('adminUsers', userLoginMsg, function (data) {
        if (data.length > 0) {
            res.json(data[0]);
            res.end();
        } else {
            res.status(404).send("I'm sorry! Login failed")
        }
    })
})
// 注册
router.post('/register', function (req, res, next) {
    let userLoginMsg = {
        adminAccount: req.body.adminAccount,
        adminPassword: req.body.adminPassword
    }
    // 数据查询
    DB.findData('adminUsers', userLoginMsg, function (data) {
        if (data.length > 0) {
            let registerStatus = {
                registerStatus: "该账号已注册哦!"
            }
            res.json(registerStatus)
        } else {
            next()
        }
    })
}, function (req, res) {
    let userLoginMsg = {
        adminAccount: req.body.adminAccount,
        adminPassword: req.body.adminPassword
    }
    // 数据添加
    DB.addData('adminUsers', userLoginMsg, function (data) {
        const ops = data.ops;
        if (ops.length > 0) {
            let registerStatus = {
                registerStatus: "账号注册成功哦!"
            }
            res.json(registerStatus)
        }
    })
})
module.exports = router;