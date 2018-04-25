var http = require('http');

var fs = require('fs');

var url = require('url');

function handle_inc_req(req, res){
}

function load_folder_list(callback){
    fs.readdir('masterfolder', (err, folders) => {
        if(err){
            callback(err);
        } else {
            var only_dirs = [];

            var iterator = (index) => {
                if(index == folders.length){
                    callback(null, only_dirs);
                    return;
                }
                fs.stat('masterfolder/'+folders[index], (err, stats) => {
                    if(stats.isDirectory()){
                        only_dirs.push(folders[index]);
                    }
                    iterator(index+1);
                });
            }
            iterator(0);
        }
    })
}

function load_file_list(foldername, page_size, page_num, callback){
    console.log(foldername);
    fs.readdir('masterfolder/'+foldername, (err, files) => {
        if(err){
            if(err.code == 'ENOENT'){
                callback( { code: 'no_such_folder', message: 'folder does not exist' } );
            } else {
                callback( { code: 'cant_load_files', message: 'server is broken' } );
            }
        } else {
            var only_files = [];

            var path = `masterfolder/${foldername}/`;

            var iterator = (index) => {
                if(index == files.length){
                    var start = page_num*page_size;
                    var output = only_files.slice(start, start+page_size);
                    var obj = { foldername: foldername, files: output };
                    callback(null, obj);
                    return;
                }
                fs.stat(path+files[index], (err, stats) => {
                    if(!err && stats.isFile()){
                        only_files.push(files[index]);
                    }
                    iterator(index+1);
                });
            }
            iterator(0);
        }
    })
}

var s = http.createServer((req, res) => {

    req.parse_url = url.parse(req.url, true);

    //console.log(req.parse_url);
    var core_url = req.parse_url.pathname;

    console.log('incoming request:', req.method, core_url);
    
    if(core_url == '/masterfolder.json'){
        load_folder_list((err, folders) => {
            if(err){
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    code: 'cannot_load_folders',
                    message: err.message
                }));
            } else {
                var output = { err: null, data: { folders: folders } };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(output));
            }
        });
    } else if (core_url.substr(0, 13) == '/masterfolder'
                && core_url.substr(core_url.length-5) == '.json') {

        var getparams = req.parse_url.query;
        var page_size = getparams.page_size ? parseInt(getparams.page_size) : 10;
        var page_num = getparams.page ? parseInt(getparams.page) - 1 : 0;

        if(isNaN(page_size)) { page_size = 10; }
        if(isNaN(page_num)) { page_num = 0; }


        load_file_list(core_url.substr(14, core_url.length-19), page_size, page_num, (err, files) => {
            if(err){
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    code: 'cannot_load_files',
                    message: err.message
                }));
            } else {
                var output = { err: null, data: files };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(output));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            code: 'no_such_page',
            message: 'no such page'
        }));
    }
    
});

s.listen(4200);