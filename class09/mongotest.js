//database      table           rows|records
//database      collections     documents

var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var mongoClient;

//var url = 'mongodb://localhost:27017/folder_app';

var url = 'mongodb://localhost:27017';
var db_name = 'folder_app';

var db;

var folders_coll;
var files_coll;

var folder = {
    _id: 'folder1', //ObjectID - auto assigned if not defined
    name: 'folder1',
    title: 'folder1 title',
    description: 'bunch of files',
    date: '2018-05-15'
}

var file1 = {
    _id: 'folder1_FUCK_NO.jpg',
    filename: 'FUCK_NO.jpg',
    folder: 'folder1',
    description: 'fuck no cat',
    date: '2018-05-15'
}
var file2 = {
    _id: 'folder1_file2.txt',
    filename: 'file2.txt',
    folder: 'folder1',
    description: 'file 2',
    date: '2018-04-18'
}
var file3 = {
    _id: 'folder1_file3.txt',
    filename: 'file3.txt',
    folder: 'folder1',
    description: 'file 3',
    date: '2018-05-20'
}
var file4 = {
    //_id: 'folder1_file3.txt',
    filename: 'file4.txt',
    folder: 'folder1',
    description: 'file 4',
    date: '2018-05-22'
}
var file5 = {
    //_id: 'folder1_file3.txt',
    filename: 'file5.txt',
    folder: 'folder1',
    description: 'file 5',
    date: '2018-05-22'
}
var file6 = {
    //_id: 'folder1_file3.txt',
    filename: 'file6.txt',
    folder: 'folder1',
    description: 'file 6',
    date: '2018-05-22'
}
var file7 = {
    //_id: 'folder1_file3.txt',
    filename: 'file7.txt',
    folder: 'folder1',
    description: 'file 7',
    date: '2018-05-22'
}




/*
MongoClient.connect(
    url, 
    {
        useNewUrlParser: true,
        w: 1,
        poolSize: 100
    },
    (err, dbase) => {
    if(err){
        console.log('error!');
        process.exit(-1);
    }
    console.log('connection worked');
    db = dbase;
    db.close();
});
*/

async.waterfall([
    function(cb){
        MongoClient.connect(
            url,
            {
                useNewUrlParser: true,
                w: 1,
                poolSize: 100
            },
            (err, client) => {
                mongoClient = client;
                if(err){
                    console.log('failed');
                    process.exit(-1);
                }
                console.log('it werkd!');
                db = client.db(db_name);
                cb(null);
            }
        )
    },

    function(cb){
        //by default - db.collection('tableName', { safe:false }, (err, collection_object) => {}) 
        db.collection('folders', cb);
    },

    function(collObj, cb){
        folders_coll = collObj;
        console.log('Collection FOLDERS created or opened');
        console.log(collObj);
        db.collection('files', cb);
    },

    function(collObj, cb){
        files_coll = collObj;
        console.log('Collection FILES created or opened');
        console.log(collObj);
        cb(null);
    },

    function(cb){
        folders_coll.insertOne(folder, cb);
    },

    function(inserted_doc, cb){
        console.log('inserted a file');
        console.log(inserted_doc);
        files_coll.insertMany([file1, file2, file3, file4, file5, file6, file7], cb);
    },
    
    function(inserted_doc, cb){
        console.log('inserted some files');
        console.log(inserted_doc);
        files_coll.updateOne( { filename: 'file4.txt', folder: 'folder1'},{ $set: { description: 'a better description' } }, cb );
    },

    function(results, cb){
        console.log('updated!')
        console.log(results);
        files_coll.deleteOne( { filename: 'file3.txt', folder: 'folder1'},cb )
    },

    function(results, cb){
        console.log('lets read');
        var cursor = files_coll.find( { date: { $regex: /^2018-05/ } } )
                                .sort( { filename: -1 } )
                                .skip(1)
                                .limit(2);

        /* not as good - loop
        cursor.each((err, doc) => {
            if(err) cb(err);
            if(!doc) cb(null);
            console.log(doc);
        })
        */

        cursor.on('data', (doc) => {
            console.log(doc);
        })

        cursor.on('error', cb);

        cursor.on('end', () => {
            cb(null);
        })
    }

],
    function (err, results) {
        console.log('done');
        console.log(err);
        console.log(results);
        mongoClient.close();
});








