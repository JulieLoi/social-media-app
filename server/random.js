import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),

    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),

    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

// Gets a random amount of random values from an array
const getRandomArrayValues = (array) => {

    let myNewArray = [];
    let randomAmount = Math.floor(Math.random() * array.length);
    let arrayClone = [...array];
    
    for(let i = 0; i < randomAmount; i++) {
        let randomIndex = Math.floor(Math.random() * arrayClone.length);
        myNewArray.push(arrayClone[randomIndex]);
        arrayClone.splice(randomIndex, 1);
    }

    return myNewArray;
};

const getRandomFriends = () => {
    const randomFriends = getRandomArrayValues(userIds);

    //console.log(randomFriends)
    const stringFriends = []

    getRandomArrayValues(userIds).forEach((f) => {
        console.log(f.toString())
        stringFriends.push(f.toString())
    })

    console.log("RANDOM FRIENDS")
    console.log(stringFriends)
}

console.log("=====================+++++++++++++")
//console.log(userIds[0])
//console.log(getRandomArrayValues(getUserFriends))

getRandomFriends();
