const fs = require('fs');


const writeFileCustom = function(filePath,writeData){
    fs.writeFile(filePath,JSON.stringify(writeData),function (err,data){
    if(err) console.log(err)
    else
        console.log("Ghi file thanh cong"+data);
    })
        
}
const readFileCustom = function(filePath,onReadFileDone){
    
    fs.readFile(filePath,"utf8",function(err,data){
        if(err)
            console.log(err);
        else{
            onReadFileDone(data);
        }
    });
}
module.exports = {
    readFileCustom,
    writeFileCustom
}