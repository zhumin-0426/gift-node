let express = require('express');
let router = express.Router();
// 登入模块
let login = require('./admin/login');
router.use('/login',login);
// 仪表板
let dashboard = require('./admin/dashboard');
router.use('/dashboard',dashboard);
// 系统首页
let systemIndex = require('./admin/systemIndex');
router.use('/systemIndex',systemIndex);
// 商品模块
let goods = require('./admin/goods');
router.use('/goods',goods);
// 用户模块
let users = require('./admin/users');
router.use('/users',users);
// 导出模块
module.exports = router;