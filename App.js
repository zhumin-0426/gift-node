const express = require('express');
const app = new express();
// 前端模块
let index = require('./routers/index');
// 后台模块
let admin = require('./routers/admin');
app.use('/index', index);
// app.use('/admin', admin);
//ejs模板引擎
app.set('view engine', 'ejs');
// public静态目录
app.use(express.static('public'));
// 图片的静态目录
app.use('/upload',express.static('upload'));
// 设置服务器端口
let server = app.listen(8888, '127.0.0.1', function () {
    let host = server.address().address;

    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

})