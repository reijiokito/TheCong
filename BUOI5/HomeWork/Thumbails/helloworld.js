// const fs = require('fs'); // get library of node js
const fileModule = require("./fileModule");
const express = require('express');
//fileModule.writeFileData("test.json", "THANG VD")
fileModule.readFileData("test.json")

fileModule.returnReadData("test.json", function(fileData){
    console.log("Data is: "+fileData);
})
console.log("Hello Boss");
//No Synchornize
// console.log("Start write file");
// fs.writeFile("test.txt", "Hello World", function(err){
//     if(err) console.log(err)
//     else console.log("Successfull");
// });
// console.log("End write file");


//fs.writeFileSync //Synchornize
// console.log("Start write file");
// fs.writeFileSync("test.txt", "Hello World");
// console.log("Successfull");
// console.log("End write file");


//No Synchornize
// console.log("Start read file");
// fs.readFile("test.txt", function(err, data){
//     if(err){
//         console.log(err)
//     }else console.log("Successfull: "+data);
// });
// console.log("End read file");


//Synchornnize
// console.log("Start read file");
// let fileData = fs.readFileSync("test.txt");
// console.log("Successfull: "+fileData);
// console.log("End read file");


//Write a variable
//WriteFile only String (not object)
// let writeData = {
//     a : 5,
//     b : 6
// }

// let jsonData = JSON.stringify(writeData);

// console.log("Start write file: "+jsonData);
// fs.writeFile("test.json", jsonData, function(err){
//     if(err) console.log(err)
//     else console.log("Successfull");
// });
// console.log("End write file");


// console.log("Start read file");
// fs.readFile("test.json", function(err, data){
//     if(err){
//         console.log(err)
//     }else console.log("Successfull: "+JSON.parse(data));
// });
// console.log("End read file");


//Create Module's THANGVD
