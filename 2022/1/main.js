const fs = require('fs');
const util = require('util');

fs.readFile('puzzle-input', 'utf-8', function (err, data) {
	let splitRations = data.split("\r\n");
	let chunkIndex = 0;
	let elfRations = splitRations.reduce((resultArray, item) => {
		// Everytime we encounter an empty string, increase chunk index
		if (item === "") {
			chunkIndex += 1;
		}

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [];
		}

		// Add calorie count to the new array at chunkIndex (which corresponds to the "elf" index)
		if (item !== "") {
			resultArray[chunkIndex].push(parseInt(item))
		}

		return resultArray
	}, [])

	let topElf = getElfWithMostCalories(elfRations);
	console.log("Elf " + topElf.index + " has the most calories: " + topElf.totalCalories);

	elfRations.splice(topElf.index, 1);

	let secondElf = getElfWithMostCalories(elfRations);

	elfRations.splice(secondElf.index, 1);

	let thirdElf = getElfWithMostCalories(elfRations);

	console.log("Total calories from top 3 elves: " + (topElf.totalCalories + secondElf.totalCalories + thirdElf.totalCalories));
});

const getElfWithMostCalories = (allElfRations) => {
	return allElfRations.reduce((elfWithMostCalories, elfRations, currentIndex) => {
		let sumOfElfRations = elfRations.reduce((sum, ration) => {
			return sum + ration;
		}, 0);

		let currentElf = {
			index: currentIndex,
			totalCalories: sumOfElfRations
		}

		if (sumOfElfRations > elfWithMostCalories.totalCalories) {
			elfWithMostCalories = currentElf;
		}

		return elfWithMostCalories;

	}, {index: 0, totalCalories: 0});
};

// Not used; but demonstrates the idea behind reduce()
const sumRations = (rations) => {
	return rations.reduce(reducer, 0);
}

const reducer = (accumulator, item) => {
	return accumulator + item;
};
