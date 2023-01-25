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

// Gets random likes 
const getRandomLikes = (array) => {

    const userLikes = getRandomArrayValues(array);

    let likeObject = userLikes.reduce((accumulator, value) => {
        return {...accumulator, [value]: true};
    }, {});

    return likeObject;
}

export const users = [
    {
        _id: userIds[0],
        firstName: "Alexis",
        lastName: "Speilgar",
        email: "alexisspeilgar@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p11.jpeg",
        friends: getRandomArrayValues(userIds),
        location: "San Francisco, California, United States",
        occupation: "Software Engineer",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "aspeilgar",
        linkedInHandle: "AlexisSpeilgar",
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: userIds[1],
        firstName: "Steve",
        lastName: "Ralph",
        email: "steveralph@gmail.com",
        password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p3.jpeg",
        friends: getRandomArrayValues(userIds),
        location: "New York, United States",
        occupation: "Line Cook",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "ABoringDystopia",
        linkedInHandle: "SteveRalph",
        createdAt: 1595589072,
        updatedAt: 1595589072,
        __v: 0,
    },
    {
        _id: userIds[2],
        firstName: "Aira",
        lastName: "Precious",
        email: "airaprecious@gmail.com",
        password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        picturePath: "p4.jpeg",
        friends: getRandomArrayValues(userIds),
        location: "Canada",
        occupation: "Data Scientist Hacker",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "AiraPrecious$",
        linkedInHandle: "AiraPrecious",
        createdAt: 1288090662,
        updatedAt: 1288090662,
        __v: 0,
    },
    {
        _id: userIds[3],
        firstName: "Liam",
        lastName: "Trevont",
        email: "lieamtrevont@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p6.jpeg",
        friends: getRandomArrayValues(userIds),
        location: "Korea",
        occupation: "Educator",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "TeacherTrevont",
        linkedInHandle: "LiamTrevont",
        createdAt: 1219214568,
        updatedAt: 1219214568,
        __v: 0,
    },
    {
        _id: userIds[4],
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p5.jpeg",
        friends: getRandomArrayValues(userIds),
        location: "Utah, United States",
        occupation: "Hacker",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "JaneDoe",
        linkedInHandle: "JaneDoe",
        createdAt: 1493463661,
        updatedAt: 1493463661,
        __v: 0,
    },
    {
        _id: userIds[5],
        firstName: "Harvey",
        lastName: "Dunn",
        email: "harveydunn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p7.jpeg",
        friends: getRandomArrayValues(userIds),
        location: "Los Angeles, California, United States",
        occupation: "Journalist",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "HarveyDunn",
        linkedInHandle: "HarveyDunn",
        createdAt: 1381326073,
        updatedAt: 1381326073,
        __v: 0,
    },
    {
        _id: userIds[6],
        firstName: "Carly",
        lastName: "Vowel",
        email: "carlyvowel@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p8.jpeg",
        friends: getRandomArrayValues(userIds),
        location: "Chicago, Illinois, United States",
        occupation: "Nurse",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "NurseCarly",
        linkedInHandle: "CarlyVowel",
        createdAt: 1714704324,
        updatedAt: 1642716557,
        __v: 0,
    },
    {
        _id: userIds[7],
        firstName: "Jessica",
        lastName: "Dunn",
        email: "jessicadunn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p9.jpeg",
        friends: getRandomArrayValues(userIds),
        location: "United Kingdom",
        occupation: "Student",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "AspiringEcho",
        linkedInHandle: "JessicaDunn",
        createdAt: 1369908044,
        updatedAt: 1359322268,
        __v: 0,
    },
    {
        _id: userIds[8],
        firstName: "Elijah",
        lastName: "Pilchard",
        email: "elijahpilchard@gmail.com",
        password: "$2b$10$f4LwT.39mywc5z4SU4lR9.v9Rsw5U5sTtX6tTfVGulpRfr/8TFDJu",
        picturePath: "elijah-pilchard-QgJUb7tsvNg-unsplash.jpg",
        friends: getRandomArrayValues(userIds),
        location: "Woodside East, Delaware, United States",
        occupation: "Veternarian",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "VetPickle",
        linkedInHandle: "ElijahPilchard",
        createdAt: 1674251036757,
        updatedAt: 1674251861907,
        __v: 2,
    },
    {
        _id: userIds[9],
        firstName: "Martin",
        lastName: "Baron",
        email: "martinbaron@gmail.com",
        password: "$2b$10$EN38DRCDxRTSOOxrUWA3je5l7/3UnUWbSgEjG9oN8dPcDTBLUAxAi",
        picturePath: "martin-baron-57oFiYVpvIk-unsplash.jpg",
        friends: getRandomArrayValues(userIds),
        location: "San José Province, Costa Rica",
        occupation: "Florist",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "VetPickle",
        linkedInHandle: "ElijahPilchard",
        createdAt: 1674251660589,
        updatedAt: 1674251862900,
        __v: 2,
    },
    {
        _id: userIds[10],
        firstName: "Mark",
        lastName: "Doyle",
        email: "markdoyle@hotmail.com",
        password: "$2b$10$oPFOrr1Br6/OjmHYnDgSrOYT1lD0.o.r68xfPq5RlEdIfwmv7cnn2",
        picturePath: "martin-baron-iB4YWDcN85g-unsplash.jpg",
        friends: getRandomArrayValues(userIds),
        location: "Mexico",
        occupation: "Genealogist",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "markdoyle",
        linkedInHandle: "markdoyle",
        createdAt: 1674251845636,
        updatedAt: 1674252401767,
        __v: 3,
    },
    {
        _id: userIds[11],
        firstName: "Alireza",
        lastName: "Rostami",
        email: "alirezarostami@gmail.com",
        password: "$2b$10$d7YfGTlP7B2hjo805uOvuuaNKQH7TM4is8wj8AVWitvUTmCvI7XHS",
        picturePath: "alireza-rostami-yYUi0DcRC9o-unsplash.jpg",
        friends: getRandomArrayValues(userIds),
        location: "Lorraine, Quebec, Canada",
        occupation: "Songwriter",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "RostamiWriter",
        linkedInHandle: "AlirezaRostami",
        createdAt: 1674252035530,
        updatedAt: 1674253257439,
        __v: 2,
    },
    {
        _id: userIds[12],
        firstName: "Maria",
        lastName: "Maldonado",
        email: "marlamaldonado@gmail.com",
        password: "$2b$10$7x4d0xUVvpBt5RdDCARwDOmVnKTxNrCuB0nns9.1H8OjLjSBhxbTa",
        picturePath: "nitish-goswami-WmFwsO-d-vo-unsplash.jpg",
        friends: getRandomArrayValues(userIds),
        location: "Allier, France",
        occupation: "Manicurist",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "MariaNailology",
        linkedInHandle: "MariaMaldonado",
        createdAt: 1674252654413,
        updatedAt: 1674604131389,
        __v: 5,
    },
    {
        _id: userIds[13],
        firstName: "Nima",
        lastName: "Sarram",
        email: "nimasarram@gmail.com",
        password: "$2b$10$HF6PgHML0O.J9g9.2SaCXOAwf1CHWh6FLGj0VxsNVn1DBLe.xkH/S",
        picturePath: "nima-sarram-VLzg5MwRWXI-unsplash.jpg",
        friends: getRandomArrayValues(userIds),
        location: "Greenland",
        occupation: "Snowboard Instructor",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "SnowboardLifer",
        linkedInHandle: "NimaSarram",
        createdAt: 1674593846928,
        updatedAt: 1674605657523,
        __v: 1,
    },
    {
        _id: userIds[14],
        firstName: "Ethan",
        lastName: "Hoover",
        email: "ethanhoover@gmail.com",
        password: "$2b$10$HF6PgHML0O.J9g9.2SaCXOAwf1CHWh6FLGj0VxsNVn1DBLe.xkH/S",
        picturePath: "ethan-hoover-0YHIlxeCuhg-unsplash.jpg",
        friends: getRandomArrayValues(userIds),
        location: "Greenland",
        occupation: "Assistant Director",
        viewedProfile: Math.floor(Math.random() * 150000),
        impressions: Math.floor(Math.random() * 150000),
        twitterHandle: "HooverVille",
        linkedInHandle: "EthanHoover",
        createdAt: 1674593846928,
        updatedAt: 1674605657523,
        __v: 1,
    },
];

export const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        description: "A good breakfast to start the day!",
        picturePath: "post1.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: userIds[0], 
                comment: "Good looking salad!"
            },
            {
                id: 1, userId: userIds[3], 
                comment: "orange juice is a great way to start the day"
            },
            {
                id: 2, userId: userIds[13], 
                comment: "Let's have breakfast together later on"
            },
            {
                id: 3, userId: userIds[5], 
                comment: "Try having a breakfast salad with an egg next time!"
            },
            {
                id: 4, userId: userIds[3], 
                comment: "Have a good day!"
            },
            {
                id: 5, userId: userIds[7], 
                comment: "i prefer apple juice"
            },
        ],
    },

    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[3],
        description:
        "what do you all think of this breakfast?",
        picturePath: "post2.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: userIds[1], userName: "Steve Ralph",
                userPicturePath: "p3.jpeg",
                comment: "i hope you had more than that"
            },
            {
                id: 0, userId: userIds[11], userName: "Alireza Rostami",
                userPicturePath: "alireza-rostami-yYUi0DcRC9o-unsplash.jpg",
                comment: "Looks really good!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[4],
        description:
        "Jane Doe here having a blast at the local festival!",
        picturePath: "post3.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: userIds[4],
                comment: "Utah sure knows how to throw a festival!"
            },
            {
                id: 1, userId: userIds[2], 
                comment: "What city is this in Jane?"
            },
            {
                id: 2, userId: userIds[4], 
                comment: "Salt Lake City!"
            },
            {
                id: 3, userId: userIds[2], 
                comment: "It looks amazing! I would love to put it on my bucket list!"
            },
            {
                id: 4, userId: userIds[8], 
                comment: "I want to check this place out!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[5],
        description:
        "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
        picturePath: "post4.jpeg",
        likes: getRandomLikes(userIds),
        comments: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        description:
        "Just a short description. I'm tired of typing. I'm going to play video games now.",
        picturePath: "post5.jpeg",
        likes: getRandomLikes(userIds),
        comments: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[7],
        description:
        "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
        picturePath: "post6.jpeg",
        likes: getRandomLikes(userIds),
        comments: [],
    },
];

export const advertisements = [

];