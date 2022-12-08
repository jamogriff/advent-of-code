const fs = require('fs');
const util = require('util')
const inputHelper = require('./input-helper');

fs.readFile('puzzle-input', 'utf-8', (err, data) => {
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
            let file = new File(fileElems[1], parseInt(fileElems[0]));
            parentDir?.files.push(file);
        }
    }

    let directorySizes = [];
    let rootDir = directoryPath[0];
    rootDir.calculateTotalSize(directorySizes);

    debugger;
    // less verbose syntax for reduce (and can chain a filter call before it
    let sumOfDirsLessThan100k = directorySizes
        .filter(dirMem => dirMem <= 100000)
        .reduce((totalMem, dirMem) => totalMem + dirMem, 0);

    //console.log(util.inspect(directoryPath[0], {showHidden: false, depth: null, colors: true}))
    console.log('Total memory of dirs smaller than 100k: ' + sumOfDirsLessThan100k);

    // Part 2
    let totalDiskSpace = 70000000;
    let spaceNeededForUpdate = 30000000;
    let sortedDirMemory = directorySizes.sort((a, b) => a - b);
    let currentFreeSpace = totalDiskSpace - sortedDirMemory.at(-1);
    let targetMemoryToBeFreed = spaceNeededForUpdate - currentFreeSpace;
    let deletionTarget = sortedDirMemory.find(dir => dir >= targetMemoryToBeFreed);
    console.log('Dir to delete has ' + deletionTarget + ', to free up ' + targetMemoryToBeFreed);
});

class Directory {
    constructor(name) {
        this.name = name;
        this.directories = [];
        this.files = [];
    }

    calculateTotalSize(dirSizes) {
        let filesize = this.files.reduce((size, file) => {
            return size + file.size;
        }, 0);

        let childDirectorySize = this.directories.reduce((size, directory) => {
            return size + directory.calculateTotalSize(dirSizes);
        }, 0);

        dirSizes.push(filesize + childDirectorySize);

        return filesize + childDirectorySize;
    }
}

class File {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}