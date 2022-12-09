const fs = require('fs');
const util = require('util')

fs.readFile('test-input', 'utf-8', (err, data) => {
    let rawInstructions = data.split('\n');
    let instructions = createMovementInstructions(rawInstructions);


    console.log(instructions);
});

class HeadInstruction {
    constructor(direction, distance) {
        this.direction = direction;
        this.distance = distance;
    }
}

const createMovementInstructions = (rawInstructions) => {
    let instructions = [];
    for (const instruction of rawInstructions) {
        let instructionElems = instruction.split(' ');
        let distance = parseInt(instructionElems[1]);

        if (distance > 1) {
            for (let i = 0; i < distance; i++) {
                instructions.push(new HeadInstruction(instructionElems[0], 1));
            }
        } else {
            instructions.push(new HeadInstruction(instructionElems[0], distance));
        }
    }
    return instructions;
}
