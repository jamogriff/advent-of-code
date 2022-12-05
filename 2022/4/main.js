const fs = require('fs');

fs.readFile('puzzle-input', 'utf-8', (err, data) => {
    let splitInput = data.split('\n');

    debugger;
    let pairs = splitInput.map((pair) => {
        let rawElfSchedules = pair.split(',');
        let firstElfSchedule = rawElfSchedules[0].split('-');
        let secondElfSchedule = rawElfSchedules[1].split('-');

        return {
            firstElf: populateSchedule(parseInt(firstElfSchedule[0]), parseInt(firstElfSchedule[1])),
            secondElf: populateSchedule(parseInt(secondElfSchedule[0]), parseInt(secondElfSchedule[1])),
        };
    });

    let numberOfOverlappingShifts = pairs.reduce((numberOfRedundantShifts, pair) => {
        if (redundancyCheck(pair.firstElf.schedule, pair.secondElf.schedule) || redundancyCheck(pair.secondElf.schedule, pair.firstElf.schedule)) {
            numberOfRedundantShifts += 1;
        }

        return numberOfRedundantShifts;
    }, 0);

    console.log("Redundant shifts: " +numberOfOverlappingShifts);
});

const redundancyCheck = (schedule1, schedule2) => {
    // Schedules are already sorted, so we're comparing min and max values between schedules here
    return (schedule2[0] >= schedule1[0] && schedule2[schedule2.length - 1] <= schedule1[schedule1.length - 1])
}

const populateSchedule = (start, end) => {
    return {
        schedule: getFullShift(start, end),
    }
}

const getFullShift = (start, end) => {
    let shifts = [];

    // if/else to account for a single hour shift
    if (start !== end) {
        for (let i = start; i <= end; i++) {
            shifts.push(i);
        }
    } else {
        shifts.push(start);
    }

    return shifts;
}