const fs = require('fs');

fs.readFile('puzzle-input', 'utf-8', (err, data) => {
    let splitDiagramFromInstructions = data.split('\n\n');

    // Diagram object has a column property with arrays indexed by their dedicated number
    let diagram = getDiagramFromInput(splitDiagramFromInstructions[0]);

    // This is an array of MovementInstruction objects
    let instructions = getInstructionsFromInput(splitDiagramFromInstructions[1]);

    instructions.forEach((instruction) => {
        for (let i = 0; i < instruction.number; i++) {
            // Popping and pushing ensures first in, last out (i.e. stack)
            let lastIn = diagram.columns[instruction.from].pop();
            diagram.columns[instruction.to].push(lastIn);
        }
    });

    let cratesOnTopWithCrateMover9000 = diagram.columns.reduce((topLetters, column) => {
        return topLetters + column.pop();
    }, '');

    console.log('Crates on top with CraneMover 9000: ' + cratesOnTopWithCrateMover9000);

    let freshDiagram = getDiagramFromInput(splitDiagramFromInstructions[0]);

    instructions.forEach((instruction) => {
        let cratesBeingMoved = [];
        for (let i = 0; i < instruction.number; i++) {
            let topCrate = freshDiagram.columns[instruction.from].pop();
            // Intermediate crate bundle is first-in, last out (use unshift)
            cratesBeingMoved.unshift(topCrate);
        }

        // Shift bottom-most crate and push onto diagram
        while (cratesBeingMoved.length > 0) {
            let bottomCrate = cratesBeingMoved.shift();
            freshDiagram.columns[instruction.to].push(bottomCrate);
        }
    });

    let cratesOnTopWithCrateMover9001 = freshDiagram.columns.reduce((topLetters, column) => {
        return topLetters + column.pop();
    }, '');

    console.log('Crates on top using CrateMover9001: ' + cratesOnTopWithCrateMover9001);
});

const getInstructionsFromInput = (rawInstructions) => {
    let instructions = rawInstructions.split('\n');

    return instructions.map((instruction) => {
        return new MovementInstruction(instruction);
    });
}

const getDiagramFromInput = (rawDiagram) => {
    let textDiagram = rawDiagram.split('\n');
    textDiagram.pop(); // last element of diagram isn't needed and will cause issue with populating data

    let stringDivisionNumber = 4; // every 4th character a new "column" starts
    let rowCharLength = textDiagram[0].length;
    let numOfColumns = Math.ceil(rowCharLength / stringDivisionNumber);
    let diagram = new StorageDiagram(numOfColumns);

    textDiagram.forEach((row) => {
        processDiagramRow(diagram, row, rowCharLength, stringDivisionNumber);
    })

    return diagram;
}

const processDiagramRow = (diagram, row, rowLength, colLength) => {
    let correspondingArray = 1;
    let letterIndex = 1;

    for (let i = 0; i < rowLength; i++) {
        // Given a colLength of 4, this ensures a "sub-increment" on indexes 3, 7, 11, etc
        if (i % colLength === (colLength - 1)) {
            correspondingArray += 1;
            letterIndex += colLength;
        }

        if ((i === letterIndex) && (row[i] !== ' ')) {
            // Unshifting ensures populating via first-in, last out
            diagram.columns[correspondingArray].unshift(row[i]);
        }
    }
}

class MovementInstruction {
    constructor(rawInstruction) {
        let splitInstructions = rawInstruction.split(' ');
        this.number = parseInt(splitInstructions[1]);
        this.from = parseInt(splitInstructions[3]);
        this.to = parseInt(splitInstructions[5]);
    }
}

class StorageDiagram {
    constructor(numberOfColumns) {
        this.columns = this.initColumns(numberOfColumns);
    }

    initColumns(number) {
        let columns = [];
        for (let i = 1; i <= number; i++) {
            columns[i] = [];
        }

        return columns;
    }
}
