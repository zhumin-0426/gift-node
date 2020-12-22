let express = require('express');
let router = express.Router();
// 授权模块
let impower = require('./gift/impower/index');
router.use('/impower',impower);
module.exports = router;