var Person = function(){
    this.age = 35;
    this.name = 'defaultName';
};

Person.prototype.getAge = function(){
    return this.age;
};

Person.prototype.getName = function(){
    return this.name;
};

Person.prototype.speak = function(){
    console.log('person said something');
};


module.exports = Person;


