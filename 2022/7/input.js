module.exports = {
    isUserCommand: (input) => {
        return (input[0] === '$')
    },

    isFile: (input) => {
        let split = input.split(' ');
        let possibleNumber = parseInt(split[0]);
        return !isNaN(possibleNumber);
    },

    isDirectory: (input) => {
        return (input.slice(0, 3) === 'dir');
    },

    isShowUserCommand: (input) => {
        let split = input.split(' ');
        return (split[1] === 'ls');
    },

    isMoveUserCommand: (input) => {
        let split = input.split(' ');
        return (split[1] === 'cd');
    }
}