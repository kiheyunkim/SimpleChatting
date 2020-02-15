const { uniqueNamesGenerator, Config, adjectives, colors, animals } = require('unique-names-generator');
const nameConfig = {dictionaries: [adjectives, colors, animals]}

let nameArray = [];

let GetName = ()=>{
    let newName = uniqueNamesGenerator(nameConfig);

    while(nameArray.find(element=> element === newName) !== undefined){
        newName = uniqueNamesGenerator(nameConfig);
    }

    nameArray.push(newName);

    return newName;
};

let RemoveName = (name)=>{
    nameArray = nameArray.filter(element => element!==name);
};

let GetList = ()=> nameArray;

module.exports={GetName, RemoveName, GetList};
