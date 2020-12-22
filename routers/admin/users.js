const express = require('express');
const router = express.Router();
// 获取上传图片插件
const multiparty = require('multiparty');
// MongoDB
const DB = require('../../modules/db');
// common.js
const common = require('../../modules/common');
// 用户列表
router.get('/list', function (req, res) {
    // 列表查询
    let findUsersData = (callback) => {
        DB.findData('users', {}, function (data) {
            callback(data)
        })
    }
    findUsersData((result) => {
        DB.findData('usersDel', {}, function (data) {
            let userData = result;
            let usersDel = data;
            userData.forEach((item,index)=>{
                usersDel.forEach((itemDel,indexDel)=>{
                    userData[index]['usersDel'] = usersDel[indexDel];
                })
            })
            res.render('admin/users/list', { list: userData })
        })
    })
})
// 添加用户
router.get('/add', function (req, res) {
    res.render('admin/users/add');
})
router.post('/doAdd', function (req, res) {
    DB.findData('publicId', {}, function (PUBLICID) {
        let form = new multiparty.Form();
        form.uploadDir = 'upload/users'   //上传图片保存的地址     目录必须存在
        form.parse(req, function (err, fields, files) {
            if (err) {
                throw new Error('add users error!');
                return;
            }
            let json = {
                "id": PUBLICID[0].id + 1,
                "userImg": files.userImg[0].path,
                "name": fields.userName[0],
                "register": common.getNowFormatDate(),
                "vipLevel": fields.vipLevel[0],
                "userAccount": fields.userAccount[0],
                "password": fields.password[0],
                "userLoginMsg": { "userAccount": fields.userAccount[0], "password": fields.password[0] }
            }
            DB.addData('users', json, function (result) {
                if (result) {
                    // 将现有ID更新
                    DB.upData('publicId', { "id": PUBLICID[0].id }, { "id": PUBLICID[0].id + 1 }, function (result) {
                        console.log("id更新成功", result);
                    })
                    res.redirect('/admin/users/list')
                }
            })
        });
    })
})
//删除用户
router.get("/remove",function(req,res){
    console.log("删除用户",req.query.id);
    let id = Number(req.query.id);
    DB.removeData('users',{"id":id},function(data){
        console.log("用户删除成功");
    })
})
//编辑用户
router.get("/editor",function(req,res){
   console.log(res)
})
module.exports = router;