
var mysql = require('mysql');
var async = require('async');

var host = 'localhost';
var database = 'FolderApp';
var username = 'root';
var password = 'dawson';

var dbpool;




var folder = {
    name: 'folder1',
    title: 'folder1 title',
    description: 'bunch of files',
    date: '2018-05-15'
}

var file1 = {
    filename: 'FUCK_NO.jpg',
    folder: 'folder1',
    description: 'fuck no cat',
    date: '2018-05-15'
}
var file2 = {
    filename: 'file2.txt',
    folder: 'folder1',
    description: 'file 2',
    date: '2018-04-18'
}
var file3 = {
    filename: 'file3.txt',
    folder: 'folder1',
    description: 'file 3',
    date: '2018-05-20'
}
var file4 = {
    filename: 'file4.txt',
    folder: 'folder1',
    description: 'file 4',
    date: '2018-05-22'
}
var file5 = {
    filename: 'file5.txt',
    folder: 'folder1',
    description: 'file 5',
    date: '2018-05-22'
}
var file6 = {
    filename: 'file6.txt',
    folder: 'folder1',
    description: 'file 6',
    date: '2018-05-22'
}
var file7 = {
    filename: 'file7.txt',
    folder: 'folder1',
    description: 'file 7',
    date: '2018-05-22'
}





async.waterfall([
    function(cb){
        dbpool = mysql.createPool({
            connectionLimit:200,
            host:host,
            user:username,
            password:password,
            database: database
        });
        cb(null);
    },

    function(cb){
        dbpool.query('INSERT into Folders VALUES (?, ?, ?, ?)',
        [ folder.name, folder.title, folder.date, folder.description ],
        cb);
    },

    function(results, fields, cb){
        var q = 'INSERT into Files (folder_name, filename, description, date) VALUES (?, ?, ?, ?)';
        async.forEachSeries(
            [file1, file2, file3, file4, file5, file6, file7],
            function(item, callback){
                dbpool.query(
                    q,
                    [item.folder, item.filename, item.description, item.date],
                    callback);
            },
            cb
        )
    }


],
    function(err, result){
        console.log('done');
        console.log(err);
        console.log(result);
});