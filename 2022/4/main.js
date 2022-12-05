const fs = require('fs');

fs.readFile('test-puzzle-input', 'utf-8', (err, data) => {
    let splitInput = data.split('\n');

    let pairs = splitInput.map((pair) => {
        let rawElfSchedules = pair.split(',');
        let firstElfSchedule = rawElfSchedules[0].split('-');
        let secondElfSchedule = rawElfSchedules[1].split('-');

        return {
            firstElf: populateSchedule(parseInt(firstElfSchedule[0]), parseInt(firstElfSchedule[1])),
            secondElf: populateSchedule(parseInt(secondElfSchedule[0]), parseInt(secondElfSchedule[1])),
        };
    });

});

const populateSchedule = (start, end) => {
    return {
        schedule: getFullShift(start, end),
    }
}

const getFullShift = (start, end) => {
    let shifts = [];

    // if/else to account for a single hour shift
    if (start !== end) {
        for (i = start; i < end; i++) {
            shifts.push(i);
        }
    } else {
        shifts.push(start);
    }

    return shifts;
}