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

let replaceUserName = (originalName, newName) => {
	let index = nameArray.indexOf(originalName);
	nameArray[index] = newName;
}

let isNameExist = (newName) => {
	return nameArray.includes(newName);
}

module.exports = {getName, removeName, getList, replaceUserName, isNameExist};
