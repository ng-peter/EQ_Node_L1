var Person = require('./person');

var ben = new Person();
ben.name = 'ben';
console.log(ben.getName(), ben.getAge());

var john = new Person();
john.name = 'john';
console.log(john.getName(), john.getAge());

var pete = new Person();
console.log(pete.getName(), pete.getAge());



/*
console.log(ben);
var john = new Person();
john.name = "John";
console.log('name was changed');

console.log(ben, john);

console.log(ben.getAge());

var john = new Person();

//these are before the prototype
//console.log(john.name);
//john.name = "John";
//console.log(john.name);
//console.log(ben.name);
*/

