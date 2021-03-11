const express = require('express');
const app = new express();
// admin module
let admin = require('./routers/admin');
app.use('/admin', admin);
// picture static directory
app.use('/upload',express.static('upload'));
// set service port
let server = app.listen(8080, '127.0.0.1', function () {
    let host = server.address().address;

    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

})