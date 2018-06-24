'use strict'

function generate(testLengthArray){

  return testLengthArray.map((item,index) => {
    var a = {
      input: (() => {
        let arr = [];        
        for(let i=0;i<item;i++)
          arr.push(Math.floor((Math.random() * 100) + 1));
          arr.sort(((a,b) => a-b));
          return arr;
      }) (),                       //run function
      target: 0,
      output: -1,
    };
    

    a.target = (() => {
      let target;
      if(testLengthArray.length>=4){
        if(index==0)
          target = a.input[0];
        else if (index==item-1){
          target = a.input[testLengthArray[item-1]-1];
        }else{
          target = Math.floor((Math.random() * 100) + 1);
        }
      }else{
        target = Math.floor((Math.random() * 100) + 1);
      }
      return target;
    }) ()
    a.output = a.input.indexOf(a.target);
    return a;
  })
}
module.exports = generate

