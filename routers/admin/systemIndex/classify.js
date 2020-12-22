const express = require('express');
const { Db } = require('mongodb');
const router = express.Router();
// 图片上传处理
const multiparty = require('multiparty');
// MongoDB
const DB = require('../../../modules/db');
const common = require('../../../modules/common');
const { json } = require('body-parser');
router.get('/', function (req, res) {
    DB.findData('indexClassify', {}, function (data) {
        res.render('admin/systemIndex/classify',{list:data})
    })
})
// 分类添加
router.get('/add', function (req, res) {
    res.render('admin/systemIndex/add/classifyAdd')
})
router.post('/doAdd', function (req, res) {
    // 获取PUBLICID
    DB.findData('publicId', {}, function (PUBLICID) {
        let form = new multiparty.Form();
        form.uploadDir = 'upload/index'   //上传图片保存的地址     目录必须存在
        form.parse(req, function (err, fields, files) {
            if (err) {
                throw new Error('add banner error!');
                return;
            }
            let json = {
                createTime: common.getNowFormatDate(),
                id: PUBLICID[0].id + 1,
                h5Link: fields.h5Link[0],
                img: files.img[0].path,
                xcxLink: fields.xcxLink[0],
                imgType: files.img[0].path.split('.')[1]
            }
            // 数据更新
            DB.addData('indexClassify', json, function (result) {
                DB.upData('publicId', { "id": PUBLICID[0].id }, { "id": PUBLICID[0].id + 1 }, function (result) {
                });
                res.redirect('/admin/systemIndex/classify');
            })
        })
    })
})
// 分类删除
router.get('/delete',function(req,res){
    let json = {
        id:Number(req.query.id)
    }
    DB.removeData('indexClassify',json,function(result){
        res.redirect('/admin/systemIndex/classify')
    })
})
module.exports = router;