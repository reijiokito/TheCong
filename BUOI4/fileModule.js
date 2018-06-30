const fs = require('fs');

// const writeFileCustom = function(filePath,witeData){
//     fs.writeFile(filePath,JSON.stringify(writeData),function (err){
//     if(err) console.log(err)
//     else
//         console.log("Ghi file thanh cong");
//     })
        
// }

// module.exports = writeFileCustom;

const writeFileCustom = function(filePath,writeData){
    fs.writeFile(filePath,JSON.stringify(writeData),function (err,data){
    if(err) console.log(err)
    else
        console.log("Ghi file thanh cong"+data);
    })
        
}

const readFileCustom = function(filePath,onReadFileDone){
    onReadFileDone = function(fileData){
        console.log(fileData);
    }
    fs.readFile(filePath,"utf8",function(err,data){
        if(err)
            console.log(err);
        else
            onReadFileDone(data);
    });
}
module.exports = {
    readFileCustom,
    writeFileCustom
}