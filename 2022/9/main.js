const fs = require('fs');
const util = require('util')

fs.readFile('test-input', 'utf-8', (err, data) => {
    let rawInstructions = data.split('\n');
    let instructions = createMovementInstructions(rawInstructions);

    let headPosition = { x: 0, y: 0 };
    let tailPosition = { x: 0, y: 0 };
    let uniqueTailPositions = new Set();

    for (const instruction of instructions) {
        switch (instruction.direction) {
            case 'U':
                // inc y
            case 'R':
                // inc x
            case 'D':
                // dc y
            case 'L':
                // dc x
        }

        // check diagonal/head loc, move tail, add to Set
    }

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
