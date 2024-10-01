connects to visual studio code


const fs = require('fs');
const path = require('path');

function listFiles() {
    const directoryPath = path.resolve('.');
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }
        
        console.log('Files in the current directory:');
        files.forEach(file => {
            console.log(file);
        });
    });
}

function main() {
    console.log('Connecting to the terminal...');
    listFiles();
}

main();
