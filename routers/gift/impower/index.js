
let express = require('express');
let router = express.Router();
router.get('/doImpower',function(req,res){
    let obj = {
        say:"这是前端的授权模块"
    }
    res.status(200)
    res.json(obj)
})
module.exports = router;