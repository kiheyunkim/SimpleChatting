const {uniqueNamesGenerator, Config, adjectives, colors, animals} = require('unique-names-generator');
const nameConfig = {dictionaries: [adjectives, colors, animals]}

let nameArray = [];

let getName = () => {
	let newName = uniqueNamesGenerator(nameConfig);

	while (nameArray.find(element => element === newName) !== undefined) {
		newName = uniqueNamesGenerator(nameConfig);
	}

	nameArray.push(newName);

	return newName;
};

let removeName = (name) => {
	nameArray = nameArray.filter(element => element !== name);
};

let getList = () => nameArray;

module.exports = {getName, removeName, getList};
