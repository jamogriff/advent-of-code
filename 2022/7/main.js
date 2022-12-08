const fs = require('fs');
const inputHelper = require('input');

fs.readFile('test-input', 'utf-8', (err, data) => {
    let splitInput = data.split('\n');

    splitInput.forEach((input) => {
        if (inputHelper.isUserCommand(input)) {
            if (inputHelper.isMoveUserCommand(input)) {
                // update pwd
            }

            if (inputHelper.isShowUserCommand(input)) {
                // create classes until next user command
            }
        }

    });
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