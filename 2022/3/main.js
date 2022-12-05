const fs = require('fs');

// todo change to real data
fs.readFile('test-puzzle-input', 'utf-8', (err, data) => {
    let splitInput = data.split('\n');

    let rucksackContents = splitInput.map((rucksack) => {
        return {
            compartment1: splitRucksackIntoEqualCompartments(rucksack).first,
            compartment2: splitRucksackIntoEqualCompartments(rucksack).second,
        };
    });

    let itemPriorityMap = createPriorityMap();

});

const splitRucksackIntoEqualCompartments = (rucksackContents) => {
    let half = rucksackContents.length / 2;

    return {
        first: rucksackContents.slice(0, half),
        second: rucksackContents.slice(half, rucksackContents.length)
    };
}

const createPriorityMap = () => {
    let map = [];
    let lowPriorityStartingChar = 'a';
    let highPriorityStartingChar = 'A';
    let characterSetLength = 26; // used as modulo to normalize numbers

    for (i = 1; i < 53; i++) {
        if (i < 27) {
            var startingChar = lowPriorityStartingChar;
        } else {
            var startingChar = highPriorityStartingChar;
        }
        map.push({
            priority: i,
            itemType: String.fromCharCode(startingChar.charCodeAt(0) + ((i - 1) % characterSetLength))
        });
    }

    return map;
}
