const { uniqueNamesGenerator, Config, adjectives, colors, animals } = require('unique-names-generator');
const nameConfig = {dictionaries: [adjectives, colors, animals]}

let nameArray = [];

let GetName = ()=>{
    let newName = uniqueNamesGenerator(nameConfig);

    while(nameArray.find(element=> element === newName) !== undefined){
        newName = uniqueNamesGenerator(nameConfig);
    }

    nameArray.push(nameArray);

    return newName;
};

let RemoveName = (name)=>{
    nameArray.filter(element => element===name);
};

module.exports={GetName, RemoveName};
