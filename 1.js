// var a =100;
// function show() {
//     b = 10; //Neu khonng
//     console.log(a);
//     console.log(b);
// }
// show();
// console.log(a);
// console.log(b);

// functionName();
// //khai bao funstion
// function functionName(){
//     console.log("Hello world")
// }

// const -> let -> var
// const functionName = function () {}

// const funtionname = () => {}

// setTimeout(function(){sonsole("Kakakaka")},5000)

// const countDown = function(count){
    
//     for(let i =count;i>=0;i--)
//     setTimeout(function(){
//         console.log(i);
//         console.log(count-i);
//     },1000*(count-i));
// }
// countDown(5);

//block scope : {} use let
//function scope: {} use var

// function functionScope(){
//     var a = 3;
//     if( 1+1==2){
//         let b = 10;
//     }

//     function newFuntion(){
//         var c = 25;
//         console.log(c);
//     }
//     newFuntion();
//     console.log(a);
//     console.log(b);
//     console.log(c);//undefined
// }

// functionScope();

// javascript khong chay dong bo

// console.log("start");
// setTimeout(function(){
//     console.log("wait 1s");

// },1000);
// console.log("End");

//Function as object

// function aRose(){
//     console.log("game");
// }

// var obj = aRose;
// typeof(aRose);
// aRose();

const print = function(i){
    console.log(i);
 }
// const ortherFunction = function(functionAsObject){
//     functionAsObject(16);
// }
// ortherFunction(print);

// //orther :

// const ortherFunction = function(functionAsObject, k){
//     functionAsObject(k);
// }
// var k = 20;
// ortherFunction(print,20);




var data = null;
const ortherFunction = function(onDone){
    setTimeout(function(){
        data = 15;
        console.log(data+5);
        onDone(data);
    },1000);
    console.log(data+5);
}

ortherFunction(print);