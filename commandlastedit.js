command: node lastedit


const fs = require('fs');
const path = require('path');


function getFiles(dir) {
    return fs.readdirSync(dir).reduce((files, file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            return [...files, ...getFiles(filePath)];
        } else {
            return [...files, filePath];
        }
    }, []);
}


function getLastEditedFile() {
    const files = getFiles('.');
    let lastEditedFile = null;

    for (const file of files) {
        const { mtime } = fs.statSync(file);
        if (!lastEditedFile || mtime > lastEditedFile.mtime) {
            lastEditedFile = { file, mtime };
        }
    }

    return lastEditedFile;
}


function main() {
    const lastEdited = getLastEditedFile();

    if (lastEdited) {
        const date = lastEdited.mtime.toLocaleDateString();
        const time = lastEdited.mtime.toLocaleTimeString();
        console.log(`Your last edit was made in ${lastEdited.file} on ${date} at ${time}.`);
    } else {
        console.log('No files found.');
    }
}


main();
