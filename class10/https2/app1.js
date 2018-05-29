var express = require('express');

var one = express();
one.get('*', (req, res) => {
    console.log(req)
    res.send('classified!');
});

one.listen(8081);