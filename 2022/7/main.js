const fs = require('fs');
const util = require('util')
const inputHelper = require('./input-helper');

fs.readFile('test-input', 'utf-8', (err, data) => {
    let splitInput = data.split('\n');

    // This is a stack that keeps track of the parent and current dirs,
    // root will always be at [0]
    let directoryPath = [];
    for (const input of splitInput) {
       let parentDir = directoryPath[directoryPath.length - 1];

        if (inputHelper.isMoveUserCommand(input)) {
            let dirArg = inputHelper.getDirectory(input);
            if (dirArg === '..') {
                directoryPath.pop();
            } else {
                let newDir = new Directory(dirArg)
                parentDir?.directories.push(newDir);
                directoryPath.push(newDir);
            }
        }

        if (inputHelper.isFile(input)) {
            let fileElems = input.split(' ');
            let file = new File(fileElems[1], fileElems[0]);
            parentDir?.files.push(file);
        }
    }

    console.log(util.inspect(directoryPath[0], {showHidden: false, depth: null, colors: true}))
});

class Directory {
    constructor(name) {
        this.name = name;
        this.directories = [];
        this.files = [];
    }

    calculateTotalSize() {
        let filesize = this.files.reduce((size, file) => {
            return size + file.size;
        }, 0);

        let childDirectorySize = this.directories.reduce((size, directory) => {
            return size + directory.calculateTotalSize();
        }, 0);

        return filesize + childDirectorySize;
    }
}

class File {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}