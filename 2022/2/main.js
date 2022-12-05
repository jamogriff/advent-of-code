const fs = require('fs');
const rules = require('./game-rules');

fs.readFile('puzzle-input', 'utf-8', (err, data) => {
    let splitInput = data.split('\n');

    let rounds = splitInput.map((round) => {
        let choices = round.split(' ');
        return {
            opponent: choices[0],
            me: choices[1],
        };
    });

    // These used for debugging the countPoint method
    let undefinedCount = 0;
    let correctCount = 0;
    let totalPoints = rounds.reduce((totalPoints, currentRound) => {
        //console.log(currentRound);
        if (typeof countPoints(currentRound.opponent, currentRound.me) === 'undefined') {
            undefinedCount += 1;
        };

        if (typeof countPoints((currentRound.opponent, currentRound.me) === 'integer')) {
            correctCount += 1;
        }
    }, 0);

    console.log("Undefined counts: " + undefinedCount);
    console.log("Correct counts: " + correctCount);
});

// todo Bug is here somewhere
const countPoints = (opponentChoice, myChoice) => {
    // You're getting points from whatever choice you make
    let pointsFromChoice = rules.getPointsFromChoice(myChoice);

    if (myChoice === rules.getWinningChoice(opponentChoice)) {
        return (pointsFromChoice + rules.resultPoints.win);
    }

    if (myChoice === rules.getLosingChoice(opponentChoice)) {
        return (pointsFromChoice + rules.resultPoints.loss);
    }

    if (myChoice === rules.getDrawChoice(opponentChoice)) {
        return (pointsFromChoice + rules.resultPoints.draw);
    }
}


