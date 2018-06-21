'use strict'



function sort(input) {
  var tem = 0;
  var len = input.length;
  for(var i=0;i<len;i++)
    for(var j=i+1;j<len;j++)
      if(input[i]>input[j]){
        tem = input[i];
        input[i] = input[j];
        input[j] = tem;
      }
  
  return input;
}


module.exports = sort
