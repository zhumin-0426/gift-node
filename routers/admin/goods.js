const express = require('express');
const router = express.Router();
// 商品列表
router.get('/list',(req,res)=>{
    res.render('admin/goods/index')
})
// 商品添加
router.get('/add',(req,res)=>{
    res.render('admin/goods/add')
})
module.exports = router;