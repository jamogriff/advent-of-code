const fs = require('fs');

fs.readFile('puzzle-input', 'utf-8', (err, data) => {
    let splitDiagramFromInstructions = data.split('\n\n');

    let diagram = getDiagramFromInput(splitDiagramFromInstructions[0]);
    console.log(diagram);

    // This is an array of MovementInstruction objects
    let instructions = getInstructionsFromInput(splitDiagramFromInstructions[1]);
    /*let rucksackContents = splitInput.map((rucksack) => {
        return {
            compartment1: splitRucksackIntoEqualCompartments(rucksack).first,
            compartment2: splitRucksackIntoEqualCompartments(rucksack).second,
            fullRucksack: rucksack
        };
    });*/
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
    debugger;
    let diagram = new StorageDiagram(numOfColumns);

    textDiagram.forEach((row) => {
        processDiagramRow(diagram, row, rowCharLength, stringDivisionNumber);
    })

    return diagram;
}

const processDiagramRow = (diagram, row, rowLength, colLength) => {
    let chunkIndex = 1;
    let resetIndex = colLength - 1; // colLength is 4, but that means a new index should occur on 3 due to zero-indexing
    for (let i = 0; i < rowLength; i++) {
        if (i % resetIndex === 0 && i !== 0) {
            chunkIndex += 1;
        }

        debugger;
        if (i % 2 === 0 && !(i % colLength === 0) && (row[i] !== ' ')) {
            debugger;
            diagram.columns[chunkIndex].unshift(row[i]);
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
