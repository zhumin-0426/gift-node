let express = require('express');
let router = express.Router();
router.get('/',function(req,res){
    res.render('admin/dashboard/index');
})
module.exports = router