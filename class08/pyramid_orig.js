var fs = require('fs');


function load_file_contents(path, callback) {
  fs.open(path, 'r', (err, fd) => {
    if (err){
      callback(err);
      return;
    } else if (!fd) {
      callback({error:'invalid_handle', message:'bad file handle from fs.open'});
    } else {
      fs.fstat(fd, (err, stats) => {
        if (err){
          callback(err);
          return;
        } else {
          if (stats.isFile()){
            var buffer = new Buffer(stats.size);
            fs.read(fd, buffer, 0, stats.size, null, (err, bytesRead, buf) => {
              if (err){
                callback(err);
              } else {
                fs.close(fd, (err) => {
                  if (err){
                    callback(err);
                    return;
                  } else {
                    callback(null, buffer.toString('utf8', 0, bytesRead));
                  }
                });
              }
            });
          } else {
            callback({error:'not_file', message:'can not load directory'});
          }
        }
      });
    }
  });
}


load_file_contents('pyramid.js', (err, contents) => {
  if (err) {
    console.log(JSON.stringify(err));
  } else {
    console.log(contents);
  }
});
