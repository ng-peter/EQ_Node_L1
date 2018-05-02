var http = require('http');

var qs = require('querystring');

function handle_request(request, result){
    console.log('incoming request:', request.method, request.url);
    
    var form_data = '';

    request.on('readable', ()=>{
        var data = request.read();
        if(typeof data == 'string'){
            form_data += data;
            console.log('it was a string');
        } else if (typeof data == 'object' && data instanceof Buffer){
            form_data += data.toString('utf8');
            console.log('it was a buffer');
        }
    })
    request.on('end', ()=>{
        var output = '';
        if(!form_data || form_data.length == 0 ){
            output = 'I did not get any form data';
        } else {
            var obj = qs.parse(form_data);
            if(!obj){
                output = 'no valid form data';
            }else{
                output = 'I got valid form data:' + JSON.stringify(obj);
            }
        }
        result.end(output);
    })
    request.on('error', ()=>{
        
    })

}

//http.createServer(handle_request).listen(4200);

var server = http.createServer(handle_request);
server.listen(4200);