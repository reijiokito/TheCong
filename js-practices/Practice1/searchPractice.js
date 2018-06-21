// 'use strict'


input = [-6795, -2462, -12, 0, 506, 7896, 10000];
  target = 506;
 
function search(input, target) {
  length = input.length;
  for(let i=0;i<length;i++){
    if(input[i] == target)
      return i;
    if(i==(length-1))
    return -1;
  }
  return -1;
}

module.exports = search
