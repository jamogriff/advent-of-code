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

    let totalPoints = rounds.reduce((totalPoints, currentRound) => {
        return totalPoints + countPoints(currentRound.opponent, currentRound.me);
    }, 0);

    console.log("Total points if first condition: " + totalPoints);

    let totalPointsFromSecondCondition = rounds.reduce((totalPoints, currentRound) => {
        let resultNeeded = rules.getResultNeededFromCharacter(currentRound.me);

        switch (resultNeeded) {
            case 'win':
                let pointsFromWin = countPoints(currentRound.opponent, rules.getWinningChoice(currentRound.opponent));
                return (totalPoints + pointsFromWin);
            case 'draw':
                let pointsFromDraw = countPoints(currentRound.opponent, rules.getDrawChoice(currentRound.opponent));
                return (totalPoints + pointsFromDraw);
            case 'lose':
                let pointsFromLoss = countPoints(currentRound.opponent, rules.getLosingChoice(currentRound.opponent));
                return (totalPoints + pointsFromLoss);
        }

    }, 0);

    console.log("Total points from second condition: " + totalPointsFromSecondCondition);
});

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


