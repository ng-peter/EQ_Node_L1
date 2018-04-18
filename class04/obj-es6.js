var EventEmitter = require('events').EventEmitter;
var util = require('util');

class Car {
    constructor(make){
        this.make = make;
        this.currentSpeed = 50;
    }
}

util.inherits(Car, EventEmitter);

class Cab extends Car {
    constructor(make, maxSpeed){
        super(make);
        this.maxSpeed = maxSpeed;
    }
}

var honda = new Car("honda");

console.log(honda.currentSpeed);

var cab1 = new Cab("VW", 100);
cab1.make = "honda"
console.log(cab1);


cab1.on('working', (arg) => {
    console.log('ok', arg);
})

cab1.emit('working', 123);




