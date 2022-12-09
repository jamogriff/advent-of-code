const fs = require('fs');
const util = require('util')

fs.readFile('puzzle-input', 'utf-8', (err, data) => {
    let rows = data.split('\n');
    let maxXCoordinate = rows[0].length - 1;
    let maxYCoordinate = rows.length - 1;

    let treeGrid = [];
    for (let i = 0; i < rows.length; i++) {
        let currentRow = rows[i];
        for (let j = 0; j < currentRow.length; j++) {
            treeGrid.push(new TreeCell(currentRow[j], j, i));
        }
    }

    //console.log(util.inspect(treeGrid, {showHidden: false, depth: null, colors: true}))
    let numberVisible = treeGrid
        .filter(treeCell => visibilityCheck(treeCell, treeGrid, maxXCoordinate, maxYCoordinate))
        .reduce((numVisible, treeCell) => numVisible += 1, 0)

    console.log(numberVisible + ' trees are visible from outside.');

    // Part 2
    let idealTree = treeGrid.reduce((idealTreeScore, tree) => {
        let treeScore = calculateVisibilityScore(tree, maxXCoordinate, maxYCoordinate);

        if (treeScore > idealTreeScore) {
            idealTreeScore = treeScore;
        }

        return idealTreeScore;
    }, 0);

    console.log('The ideal tree has a score of: ' + idealTree);
});

const calculateVisibilityScore = (tree, maxXCoordinate, maxYCoordinate) => {
    let score = 1; // we're multiplying so using 1, not 0

    if (tree.tallerTreesOnTop.length > 0) {
        let sortedAsc = tree.tallerTreesOnTop.sort((a, b) => a.y - b.y);
        let closest = sortedAsc.pop()
        score *= Math.abs(tree.y - closest.y);
    } else {
        if (tree.y !== 0) {
            score *= tree.y;
        }
    }

    if (tree.tallerTreesOnBottom.length > 0) {
        let sortedDsc = tree.tallerTreesOnBottom.sort((a, b) => b.y - a.y);
        let closest = sortedDsc.pop();
        score *= Math.abs(tree.y - closest.y);
    } else {
        let viewDistance = (maxYCoordinate - tree.y);
        if (viewDistance !== 0) {
            score *= viewDistance;
        }
    }

    if (tree.tallerTreesOnLeft.length > 0) {
        let sortedAsc = tree.tallerTreesOnLeft.sort((a, b) => a.x - b.x);
        let closest = sortedAsc.pop();
        score *= Math.abs(tree.x - closest.x);
    } else {
        if (tree.x !== 0) {
            score *= tree.x;
        }
    }

    if (tree.tallerTreesOnRight.length > 0) {
        let sortedDsc = tree.tallerTreesOnRight.sort((a, b) => b.x - a.x);
        let closest = sortedDsc.pop();
        score *= Math.abs(tree.x - closest.x);
    } else {
        let viewDistance = maxXCoordinate - tree.x;
        if (viewDistance !== 0) {
            score *= viewDistance;
        }
    }

    return score;
}

const visibilityCheck = (tree, treeGrid) => {
    // All these checks must take place so we can populate the tree
    // with its tallest neighbors; previously we would just early return
    // if any were true
    let checks = [];
    checks.push(isVisibleFromTop(tree, treeGrid));
    checks.push(isVisibleFromBottom(tree, treeGrid));
    checks.push(isVisibleFromLeft(tree, treeGrid));
    checks.push(isVisibleFromRight(tree, treeGrid));

    return checks.some(bool => bool);
}

const isVisibleFromLeft = (refTree, treeGrid) => {
    return (getLargerTreesOnLeft(refTree, treeGrid).length === 0);
}


const isVisibleFromRight = (refTree, treeGrid) => {
    return (getLargerTreesOnRight(refTree, treeGrid).length === 0);
}

const isVisibleFromTop = (refTree, treeGrid) => {
    return (getLargerTreesOnTop(refTree, treeGrid).length === 0);
}

const isVisibleFromBottom = (refTree, treeGrid) => {
    return (getLargerTreesOnBottom(refTree, treeGrid).length === 0);
}

const getLargerTreesOnBottom = (refTree, treeGrid) => {
    let largerTrees = treeGrid.filter(tree => tree.x === refTree.x && tree.y > refTree.y && tree.height >= refTree.height);
    refTree.tallerTreesOnBottom = largerTrees;

    return largerTrees;
}

const getLargerTreesOnTop = (refTree, treeGrid) => {
    let largerTrees = treeGrid.filter(tree => tree.x === refTree.x && tree.y < refTree.y && tree.height >= refTree.height);
    refTree.tallerTreesOnTop = largerTrees;

    return largerTrees;
}

const getLargerTreesOnRight = (refTree, treeGrid) => {
    let largerTrees = treeGrid.filter(tree => tree.y === refTree.y && tree.x > refTree.x && tree.height >= refTree.height);
    refTree.tallerTreesOnRight = largerTrees;

    return largerTrees;
}

const getLargerTreesOnLeft = (refTree, treeGrid) => {
    let largerTrees = treeGrid.filter(tree => tree.y === refTree.y && tree.x < refTree.x && tree.height >= refTree.height);
    refTree.tallerTreesOnLeft = largerTrees;

    return largerTrees;
}

// Ended up not even needing this check
const isOnOutsideBorder = (tree, maxX, maxY) => {
    return (tree.y === 0 || tree.x === 0 || tree.x === maxX|| tree.y === maxY);
}

class TreeCell {
    constructor(height, x, y) {
        this.height = parseInt(height);
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.tallerTreesOnRight = [];
        this.tallerTreesOnLeft = [];
        this.tallerTreesOnTop = [];
        this.tallerTreesOnBottom = [];
    }

}