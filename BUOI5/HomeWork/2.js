const fileModule = require('./fileModule.js');
const express = require('express');


let fileData = fileModule.readFileCustom("testModule.json",function(fileData){
    console.log("asd "+fileData);
});
