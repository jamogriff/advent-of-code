const fs = require('fs');

fs.readFile('puzzle-input', 'utf-8', (err, data) => {
    let splitInput = data.split('\n');

    let rucksackContents = splitInput.map((rucksack) => {
        return {
            compartment1: splitRucksackIntoEqualCompartments(rucksack).first,
            compartment2: splitRucksackIntoEqualCompartments(rucksack).second,
            fullRucksack: rucksack
        };
    });

    // Part 1
    console.log('Total priorities of shared item types: ' + getTotalItemPrioritiesForEachRucksack(rucksackContents));

    // Part 2
    let chunkIndex = 0;
    let groupSize = 3; // divide up all rucksacks into groups of 3
    let elfGroups = rucksackContents.reduce((rucksackGroups, rucksack, currentIndex) => {
        // Increase chunk index for every 3 except for the first go-around
        if (currentIndex !== 0 && currentIndex % groupSize === 0) {
            chunkIndex += 1;
        }

        if (!rucksackGroups[chunkIndex]) {
            rucksackGroups[chunkIndex] = [];
        }

        rucksackGroups[chunkIndex].push(rucksack);

        return rucksackGroups;
    }, []);

    let groupedSharedItems = elfGroups.reduce((allGroupItemTypes, group) => {
        let sharedItemTypeBetweenOneAndTwo = getSharedItemTypes(group[0].fullRucksack.split(''), group[1].fullRucksack.split(''));
        let sharedItemTypeBetweenTwoAndThree = getSharedItemTypes(group[1].fullRucksack.split(''), group[2].fullRucksack.split(''));

        allGroupItemTypes.push(getSharedItemTypes(sharedItemTypeBetweenOneAndTwo, sharedItemTypeBetweenTwoAndThree).pop());

        return allGroupItemTypes;
    }, []);

    console.log('Total priorities of grouped item types: ' + sumPriorities(groupedSharedItems));
});

const getTotalItemPrioritiesForEachRucksack = (rucksackContents) => {
    let sharedRucksackItems = rucksackContents.map((rucksack) => {
        let firstCompartmentItemTypes = rucksack.compartment1.split('');
        let secondCompartmentItemTypes = rucksack.compartment2.split('');

        // Duplicate values come back; since we know there's only one shared item we just pop one element off
        return getSharedItemTypes(firstCompartmentItemTypes, secondCompartmentItemTypes).pop();
    })

    return sumPriorities(sharedRucksackItems);
}

const sumPriorities = (itemTypes) => {
    let itemPriorityMap = createPriorityMap();

    return itemTypes.reduce((priorityTotal, sharedItemType) => {
        let itemPriority = itemPriorityMap.find(keyVal => keyVal.itemType === sharedItemType);

        return priorityTotal + itemPriority.priority;
    }, 0);
}

const getSharedItemTypes = (firstCompartment, secondCompartment) => {
   return firstCompartment.filter(itemType => secondCompartment.includes(itemType));
}

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
