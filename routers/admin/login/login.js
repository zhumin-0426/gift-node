const express = require('express');
const router = express.Router();
const DB = require('../../../modules/db');
const bodyParser = require('body-parser');
// 解析 application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// 解析 application/json
router.use(bodyParser.json());
// 登入页面
router.get('/', function (req, res) {
    // res.render('admin/login')
    console.log("这是登入模块");
})
// 登入
router.post('/dologin', function (req, res) {
    let userLoginMsg = {
        adminAccount: req.body.adminAccount,
        password: req.body.password
    }
    DB.findData('adminUsers', userLoginMsg, function (data) {
        if (data.length > 0) {
            let data = {
                status:"success"
            }
            res.json(data);
            res.status(200);
        } else {
            res.send('<script>alert("登入失败");location.href="/admin/login"</script>')
        }
    })
})
// 注册
router.post('register',function(req,res){
    console.log('req',req);
})
module.exports = router;