var fs = require('fs');

var async = require('async');


function load_file_contents(path, callback) {

    var file_handle;

    async.waterfall([
        function (cb) {
            fs.open(path, 'r', cb);
        },

        function (handle, cb){
            if(!handle){
                cb({error:'invalid_handle', message:'bad file handle from fs.open'});
            } else {
                file_handle = handle;
                cb(null, handle);
            }
        },

        function (handle, cb) {
            fs.fstat(handle, cb);
        },

        function (stats, cb) {
            if (stats.isFile()){
                var buffer = new Buffer(stats.size);
                fs.read(file_handle, buffer, 0, stats.size, null, cb);
            } else {
                cb({error:'not_file', message:'can not load directory'});
            }
        },

        function (bytesRead, buf, cb) {
            fs.close(file_handle, (err) => {
                cb(null, buf.toString('utf8', 0, bytesRead));
            });
        }

    ],

    callback);

}

load_file_contents('temp.html', (err, contents) => {
  if (err) {
    console.log(JSON.stringify(err));
  } else {
    console.log(contents);
  }
});