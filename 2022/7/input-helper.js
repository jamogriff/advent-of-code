// These could be rewritten to use .match
module.exports = {
    isFile: (input) => {
        let split = input.split(' ');
        let possibleNumber = parseInt(split[0]);
        return !isNaN(possibleNumber);
    },

    isMoveUserCommand: (input) => {
        let split = input.split(' ');
        return (split[0] === '$' && split[1] === 'cd');
    },

    getDirectory: (input) => {
        let split = input.split(' ');
        return split[split.length - 1];
    }
}