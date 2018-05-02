var http = require('http');

function handle_request(request, result){
    console.log('incoming request:', request.method, request.url);
    
    var json_data = '';

    request.on('readable', ()=>{
        var data = request.read();
        if(typeof data == 'string'){
            json_data += data;
            console.log('it was a string');
        } else if (typeof data == 'object' && data instanceof Buffer){
            json_data += data.toString('utf8');
            console.log('it was a buffer');
        }
    })
    request.on('end', ()=>{
        var output = '';
        if(!json_data || json_data.length == 0 ){
            output = 'I did not get any json data';
        } else {
            var json;
            try{
                json = JSON.parse(json_data);
            } catch (e) {}

            if(!json){
                output = 'no valid json';
            }else{
                output = 'I got valid json:' + json_data;
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