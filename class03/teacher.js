var util = require('util');
var Person = require('./person');
var EventEmitter = require('events').EventEmitter;

function Teacher(){

}

Teacher.prototype = new Person();

util.inherits(Teacher, EventEmitter);

var peter = new Teacher();

peter.on('something', function(data){
    console.log('peter said:', data);
});

peter.emit('something', 'some theory');
peter.emit('something', '123');
peter.emit('something', 'some random nonsense');
peter.emit('something', 'ok');

console.log(peter.age);
peter.speak();
