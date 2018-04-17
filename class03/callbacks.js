
var doubleEven = function(v, callback){
    var randomTime = Math.floor(Math.random()*(1000+1));
    if(v%2){
        setTimeout(function(){
            callback(new Error('Odd Output'), v, randomTime);
        }, randomTime);
    } else {
        setTimeout(function(){
            callback(null, v*2, randomTime);
        }, randomTime);
    }
}

for(var i=0; i<10; i++){
    console.log('calling doubleEven for: ', i);
    doubleEven(i, function(err, results, time){
        if(err){
            console.log('error:', err.message, 'for', results, 'took', time, 'ms');
        } else {
            console.log('result:', results, 'took', time, 'ms');
        }
    })
}
















