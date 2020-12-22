const express = require('express');
const router = express.Router();
// 图片上传处理
const multiparty = require('multiparty');
// MongoDB
const DB = require('../../../modules/db');
const common = require('../../../modules/common');
router.get('/', function (req, res) {
    DB.findData('indexBanner',{},function(data){
        res.render('admin/systemIndex/banner',{list:data})
    })
})
// 广告编辑
router.get('/editor', function (req, res) {
    let json = {
        id:Number(req.query.id)
    }
    DB.findData("indexBanner",json,function(data){
       console.log(data)
       res.render('admin/systemIndex/editor/bannerEditor',{list:data[0]})
    })
})
router.post('/doEditor', function (req, res) {
    let form = new multiparty.Form();
    form.uploadDir = 'upload'   //上传图片保存的地址     目录必须存在
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error('image upload error!')
        }
        console.log('fields', fields);
        console.log('files', files);
    });
})
// 广告添加
router.get('/add', function (req, res) {
    res.render('admin/systemIndex/add/bannerAdd');
})
router.post('/doAdd', function (req, res) {
    // 获取PUBLICID
    DB.findData('publicId', {}, function (PUBLICID) {
        let form = new multiparty.Form();
        form.uploadDir = 'upload/index'   //上传图片保存的地址     目录必须存在
        form.parse(req, function (err, fields, files) {
            console.log("fields",fields);
            console.log("files",files);
            if (err) {
                throw new Error('add banner error!');
                return;
            }
            let json = {
                createTime: common.getNowFormatDate(),
                id: PUBLICID[0].id + 1,
                url: files.img[0].path,
                img: fields.linkUrl[0],
                state: fields.state[0],
                imgType: files.img[0].path.split('.')[1]
            }
            // 数据更新
            DB.addData('indexBanner', json, function (result) {
                DB.upData('publicId', { "id": PUBLICID[0].id }, { "id": PUBLICID[0].id + 1 }, function (result) {
                });
                // res.redirect('/admin/systemIndex/banner');
            })
        })
    })
})
// 广告删除
router.get('/delete',function(req,res){
    let json = {
        id:Number(req.query.id)
    }
    DB.removeData('indexBanner',json,function(result){
        res.redirect('/admin/systemIndex/banner')
    })
})
module.exports = router;