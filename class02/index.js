var myMod = require('myModule');
var myMod2 = require('myModule');
console.log(require.resolve('myModule'));

console.log('index:');
//console.log(module);
console.log(myMod2.id);
console.log(myMod.index);
console.log(myMod.getID());

var idIdx = process.argv.indexOf('--id');
if(idIdx !== -1){
  console.log(process.argv[idIdx+1]);
}



/*

var demoObj = require('./demo-obj')

var _ = require('underscore');

console.log(_.random(0,40));

var temp = "some text";

console.log("this is from index");

console.log(demoObj.temp2);

demoObj.importFunc();

//console.log(temp);


var inside = "outside";

//doSomething();


function doSomething(){
  let inside = "inside";
  console.log("function running:"+temp);
}

//console.log(inside);

//console.log(this);
//console.log(module);

*/