const express = require('express');
const router = express.Router();
// 登入模块
const login = require('./admin/login/login');
router.use('/login',login);
// 仪表板
const dashboard = require('./admin/dashboard');
router.use('/dashboard',dashboard);
// 系统首页
const systemIndex = require('./admin/systemIndex');
router.use('/systemIndex',systemIndex);
// 商品模块
const goods = require('./admin/goods');
router.use('/goods',goods);
// 用户模块
const users = require('./admin/users');
router.use('/users',users);
// 导出模块
module.exports = router;