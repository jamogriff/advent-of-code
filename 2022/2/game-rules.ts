module.exports = {
 resultPoints: {
    win: 6,
    draw: 3,
    loss: 0
 },
    getResultNeededFromCharacter: (character: string) => {
     switch (character) {
         case "X":
             return 'lose';
         case "Y":
             return 'draw';
         case "Z":
             return 'win';
     }
    },

 getPointsFromChoice: (choice: string) => {
    switch (choice) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
    }
},

 getWinningChoice: (choice: string) => {
    switch (choice) {
        case 'A':
            return 'Y';
        case 'B':
            return 'Z';
        case 'C':
            return 'X';
    }
},

 getLosingChoice: (choice: string) => {
    switch (choice) {
        case 'A':
            return 'Z';
        case 'B':
            return 'X';
        case 'C':
            return 'Y';
    }
 },

 getDrawChoice: (choice: string) => {
    switch (choice) {
        case 'A':
            return 'X';
        case 'B':
            return 'Y';
        case 'C':
            return 'Z';
    }
 }
}
