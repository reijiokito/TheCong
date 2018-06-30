const fileModule = require('./fileModule.js');
const express = require('express');
// fileModule("testModule.json","abcxyz");
// fileModule("testModule.json", {a :"abc" , b:"hello"});
fileModule.writeFileCustom("testModule.json",{a :"abc" , b:"hello"});

// fileModule.readFileCustom("testModule.json",callback); 
let fileData = fileModule.readFileCustom("testModule.json",function(fileData){
    console.log("asd "+fileData);
});



// const fs = require("fs");

//------Bat dong bo
// let writeData= {
//     a: 6,
//     b: 7
// }
// let jsondate = JSON.stringify(writeData);
// console.log("bat dau ghi file");
// fs.writeFile("test.txt",jsondate,function(err){
//     if(err) console.lof(err);
//     else
//     console.log("Ghi file thanh cong");
// });
// console.log("ket thuc");

//Ex1:
// fs.writeFile("test.txt","HelloWorld",function(err){
//     if(err) console.lof(err);
//     else
//     console.log("Ghi file thanh cong");
// });
// console.log("ket thuc");

//--------JSON : phai nam ben trong mot Object hoac Array.
// {
//     "a": 5,
//     "b": 6
// }



//----------Dong bo
// console.log("bat dau ghi file");
// let writeDone = fs.writeFileSync("test.txt","Hello world");
// console.log("Ghe file thanh cong");

//-------------Read bat dong bo
// fs.readFile("test.txt","utf8",function(err,data){
//     if(err)
//         console.log(err);
//     else{
//         console.log("Doc file thanh cong");
//         console.log(data);

//     }
// });

//------Doc JSON data thanh Object -->  Inra Object
// fs.readFile("test.txt","utf8",function(err,data){
//     if(err)
//         console.log(err);
//     else{
//         console.log("Doc file thanh cong");
//         console.log(JSON.parse(data));

//     }
// });


//-----------Read dong bo
// console.log("Bat dai doc file");
// let fleData = fs.readFileSync("test.txt","utf8");
// console.log("Doc file thanh cong "+fs.readFileSync("test.txt","utf8"));
// console.log("ket thuc doc file");

