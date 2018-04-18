var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Car = function (make) {
    this.make = make;
    this.currentSpeed = 50;
    //this.max = 50;
};
Car.prototype.max = 100;

Car.prototype.change = function (make, speed) {
    this.make = make;
    this.currentSpeed = speed;
};

util.inherits(Car, EventEmitter);

//--------------------------------

var petesCar = new Car("honda");
var johnsCar = new Car("vw");
console.log('peter',petesCar);
console.log('john',johnsCar);
petesCar.change("vw", 150);
console.log('peter',petesCar);
console.log('john',johnsCar);

var newObj = new Object();
console.log(Car.prototype);

var Cab = function (make, maxSpeed) {
    Car.call(this, make);
    this.maxSpeed = maxSpeed;
}
Cab.prototype = Object.create(Car.prototype);
Cab.prototype.constructor = Cab;

var Uber = function (make, maxSpeed, id){
    Cab.call(this, make, maxSpeed);
    this.id = id;
}
Uber.prototype = new Cab;
Uber.prototype.constructor = Uber;


var petesUber = new Uber('honda', 50, 2);

console.log(petesUber);

petesUber.on('okay', function(arg) { 
    console.log('ok', arg); 
});

petesUber.emit('okay', 'ok', false);
petesUber.emit('okay', '123');
petesUber.emit('okay', 123);
petesUber.emit('okay', false);
petesUber.emit('okay', true);




