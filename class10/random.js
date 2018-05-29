setInterval(()=>{
    console.log('simulated request');
    if(Math.random()<0.3){
        throw new Error('crashed');
    }
}, 500);