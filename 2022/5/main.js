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
    let diagram = rawDiagram.split(' ');

    return diagram;
}

class MovementInstruction {
    constructor(rawInstruction) {
        let splitInstructions = rawInstruction.split(' ');
        this.number = parseInt(splitInstructions[1]);
        this.from = parseInt(splitInstructions[3]);
        this.to = parseInt(splitInstructions[5]);
    }

}
