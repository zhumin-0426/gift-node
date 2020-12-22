const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const DB = require('../../modules/db');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
// 登入页面
router.get('/', function (req, res) {
    res.render('admin/login')
})
// 业务逻辑
router.post('/dologin', function (req, res) {
    let userLoginMsg = {
        userAccount: req.body.phone,
        password: req.body.password
    }
    DB.findData('users', userLoginMsg, function (data) {
        if (data.length > 0) {
            res.redirect('/admin/dashboard')
        } else {
            res.send('<script>alert("登入失败");location.href="/admin/login"</script>')
        }
    })
})
module.exports = router;