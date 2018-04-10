var temp2 = "hello";

function importFunc(){
  console.log('running from demoObj');
}

console.log("this is from object");

//exports.temp2 = temp2;
//exports.importFunc = importFunc;

module.exports = {
  temp2:temp2,
  importFunc:importFunc
}
