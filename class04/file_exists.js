var fs = require('fs');

function FileObject(){
    this.filename = '';
    //var self = this;
    //callback: (err, boolean)
    this.fileExists = function(callback){
        console.log('about to open', this.filename);
        fs.open(this.filename, 'r', (err, handle) => {
            if(err){
                console.log('cannot open', this.filename);
                callback(err);
                return;
            }
            //only run if file exists
            fs.close(handle);
            callback(null, true);
        })
    }
}

var fileObj = new FileObject();
fileObj.filename = "something that won't work";
fileObj.fileExists((err, exists) => {
    if(err){
        console.log('error opening file', JSON.stringify(err));
        return;
    }
    //more code for if file exists
})