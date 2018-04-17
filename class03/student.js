var Person = require('./person');

var Student = function(){
};

Student.prototype = new Person();

Student.prototype.speak = function(){
    console.log('student said something');
};

var benny = new Person();
var johnny = new Student();
console.log(johnny.getAge());
johnny.speak();
benny.speak();

console.log(johnny instanceof Student);

module.exports = Student;
