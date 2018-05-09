var express = require('express');
var morgan = require('morgan');
var multer = require('multer');


var app = express();

app.use(morgan('dev'));

var upload = multer({ dest: 'uploads/' });


app.post('/uploadtest', upload.single('file_to_upload'), (req, res) => {
    res.end(JSON.stringify(req.file, 0, 2));
});


app.listen(4200);



