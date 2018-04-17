var Student = require('./student');

var ben = new Student('ben', 40);
console.log(ben.getName(), ben.getAge());

var john = new Student('john');
console.log(john.getName(), john.getAge());

ben.speak();
john.speak();

