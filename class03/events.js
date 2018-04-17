var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on('someEvent1', function(data){
    console.log('event 1 has triggered', data);
});

emitter.once('someEvent2', function(){
    console.log('event 2 has triggered');
});

var iter = 1;
var count = 3;
function callback(){
    console.log('do something once again');
    if(count === iter)
        emitter.removeListener('someEvent1', callback);
    ++iter;
}

emitter.on('someEvent1', callback);

emitter.emit('someEvent1', { option: true });
emitter.emit('someEvent2', { option: 123 });
emitter.emit('someEvent2', { option: 'string' });
emitter.emit('someEvent1', { option: 786 });
emitter.emit('someEvent1', { option: false });
emitter.emit('someEvent1', { option: 456 });
emitter.emit('someEvent1', { option: true });

