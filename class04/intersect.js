var arrays = require('./arrays');

function intersect(arr1, arr2, callback){
    var intersection = [];

    var i = 0;

    function sub_compute(){
        for (var j=0; j<arr2.length; j++){
            if(arr2[j]==arr1[i]){
                intersection.push(arr2[j]);
                break;
            }
        }
        if(i<arr1.length){
            i++;
            //call sub_compute()
            process.nextTick(sub_compute);
        } else {
            callback(intersection);
        }
    }
    sub_compute();
}

intersect(arrays.arr1, arrays.arr2, function(results){console.log(results.length);});
console.log('done');