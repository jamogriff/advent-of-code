const fs = require('fs');
const util = require('util');

const PUZZLE_TXT_INPUT = fs.readFile('puzzle-input', 'utf-8', function (err, data) {
	let splitRations = data.split("\r\n");
	let chunkIndex = 0;
	let elfRations = splitRations.reduce((resultArray, item) => {
		if (item === "") {
			chunkIndex += 1;
		}

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [];
		}

		if (item !== "") {
			resultArray[chunkIndex].push(parseInt(item))
		}

		return resultArray
	}, [])

	//console.log(util.inspect(typeof test, { maxArrayLength: null }))
	let elfWithMostRations = elfRations.reduce((elfWithMostRations, elfRations, currentIndex) => {
		let sumOfElfRations = elfRations.reduce((sum, ration) => {
			return sum + ration;
		}, 0);

		let elf = {
			id: currentIndex,
			totalRations: sumOfElfRations
		}

		if (sumOfElfRations > elfWithMostRations.totalRations) {
			elfWithMostRations = elf;
		}

		return elfWithMostRations;

	}, {id: 0, totalRations: 0});

	console.log(elfWithMostRations);
});

const sumRations = (rations) => {
	return rations.reduce(reducer, 0);
}

const reducer = (accumulator, item) => {
	return accumulator + item;
};
