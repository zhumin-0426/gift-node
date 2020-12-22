const express = require('express');
const router = express.Router();
// 广告轮播
const banner = require('./systemIndex/banner')
router.use('/banner', banner);
// 分类导航
const classify = require('./systemIndex/classify')
router.use('/classify', classify);
// 推荐商品
const recommend = require('./systemIndex/recommend')
router.use('/recommend', recommend);
// 热购商品
const hotbuy = require('./systemIndex/hotbuy')
router.use('/hotbuy', hotbuy);

module.exports = router;