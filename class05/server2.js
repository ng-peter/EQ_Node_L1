
var http = require('http');

var fs = require('fs');

var url = require('url');


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
    });
}



function load_file_list(foldername, page, page_size, callback){
    console.log(foldername);
    fs.readdir('masterfolder/'+foldername, (err, files) => {
        console.log(files);
        if(err){
            if (err.code == "ENOENT"){
                callback(make_error("no_such_folder", "that folder doesn't exist"));
            } else {
                callback(make_error("cant_load_files", "server is broken"));
            }
        } else {
            var only_files = [];

            var path = `masterfolder/${foldername}/`;

            var iterator = (index) => {
                if(index == files.length){
                    var start = page*page_size;
                    var output = only_files.slice(start, start+page_size);
                    var obj = { foldername: foldername, files: output };
                        callback(null, obj);
                    return;
                }
                fs.stat( path+files[index], (err, stats) => {
                    if(!err && stats.isFile() && files[index].substr(0,1)!='.'){
                        only_files.push(files[index]);
                    }
                    iterator(index+1);
                });
            }
            iterator(0);
        }
    });
}











function handle_incoming_request(req, res){

    req.parsed_url = url.parse(req.url, true);
    var core_url = req.parsed_url.pathname;

    console.log('incoming request', req.method, core_url);

    if (core_url == '/masterfolder.json' ){
        handle_load_folder(req, res);
    } else if (core_url.substr(0,13) == '/masterfolder'
                && core_url.substr(core_url.length - 5) == '.json') {
        handle_load_files(req, res);
    } else {
        send_failure(res, 404, {
            code: 'no_such_page',
            message: 'no such page'
        });
    }
}

function handle_load_folder (req, res) {
    console.log('incoming request', req.method, req.url);
    load_folder_list((err, folders) => {
        if (err){
            send_failure(res, 500, {
                code: 'cant_load_folders',
                message: err.message
            });
        } else {
            send_success(res, { folders: folders } );
        }
    });
}

function handle_load_files (req, res) {
    var getparams = req.parsed_url.query;
    var page_size = getparams.page_size ? parseInt(getparams.page_size) : 1000;
    var page_num = getparams.page ? parseInt(getparams.page) - 1 : 0;

    if(isNaN(page_size)){ page_size = 1000; }
    if(isNaN(page_num)){ page_num = 0; }

    var core_url = req.parsed_url.pathname;
    load_file_list(core_url.substr(14, core_url.length - 19), page_num, page_size, (err, files) => {
        if (err){
            send_failure(res, 500, err);
        } else {
            send_success(res, files );
        }
    });
}






function make_error(code, msg){
    var e = new Error(msg);
    e.code = code;
    return e;
}

function make_resp_error(err){
    return JSON.stringify({
        code: (err.code) ? err.code : err.name,
        message: err.message
    });
}

function send_success(res, data){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var output = { error: null, data: data };
    res.end(JSON.stringify(output)+'\n');
}

function send_failure(res, server_code, err){
    var code = (err.code) ? err.code : err.name;
    res.writeHead( server_code, { 'Content-Type': 'application/json' });
    res.end(make_resp_error(err));
}








var s = http.createServer(handle_incoming_request);

s.listen(4200);