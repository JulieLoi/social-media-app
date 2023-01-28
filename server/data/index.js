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

// Get random friends
const getRandomFriends = (removeIdIndex) => {

    // User IDs (without the current user)
    let userIdsWithoutGivenId = [...userIds];
    userIdsWithoutGivenId.splice(removeIdIndex, 1);

    // Get Friends
    const stringFriends = [];
    getRandomArrayValues(userIdsWithoutGivenId).forEach((f) => {
        stringFriends.push(f.toString())
    })
    return stringFriends;
}

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
        picturePath: "user-395bb177-4ebd-439c-973a-83b83147f64c.jpeg",
        friends: getRandomFriends(0),
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
        picturePath: "user-a27bb7b4-5657-42a6-b5f9-970e87fa80a9.jpeg",
        friends: getRandomFriends(1),
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
        picturePath: "user-56f084f1-97d5-460c-8fd4-ad40568efce3.jpeg",
        friends: getRandomFriends(2),
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
        email: "liamtrevont@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "user-bfa9f582-bafa-445e-ac72-bf2899c576db.jpeg",
        friends: getRandomFriends(3),
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
        picturePath: "user-8db3fbff-b868-49d9-b8b1-1c691c3501e3.jpeg",
        friends: getRandomFriends(4),
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
        picturePath: "user-21093bc7-0601-49c3-aa60-6a5a59480842.jpeg",
        friends: getRandomFriends(5),
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
        picturePath: "user-78f13b95-0bf5-4f1e-8b3f-2f30470cff5a.jpeg",
        friends: getRandomFriends(6),
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
        picturePath: "user-79016e68-712d-429a-94f5-653f9b7a48ba.jpeg",
        friends: getRandomFriends(7),
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
        picturePath: "user-b5d53f21-31b6-4074-94b4-61fd521dbb9d.jpg",
        friends: getRandomFriends(8),
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
        picturePath: "user-ec5da2e1-d6b3-488d-9849-e6d675ba34a6.jpg",
        friends: getRandomFriends(9),
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
        picturePath: "user-74d51713-30f9-429a-968e-7dac5212b0ad.jpg",
        friends: getRandomFriends(10),
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
        picturePath: "user-9ef6ef04-323d-4ab7-baee-b9424ddcf603.jpg",
        friends: getRandomFriends(11),
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
        picturePath: "user-2057bd8d-1ddf-47a2-816c-50a3fb6b324f.jpg",
        friends: getRandomFriends(12),
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
        picturePath: "user-f1434f3c-a1df-450d-b7cc-f6f4a03e21e6.jpg",
        friends: getRandomFriends(13),
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
        picturePath: "user-1f8cd347-b8b0-4778-9d12-29753e88f12f.jpg",
        friends: getRandomFriends(14),
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
        picturePath: "post-ea585252-dfad-4e80-9ccf-c1dbb9d9cc8f.jpeg",
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
        userId: userIds[14],
        description:
        "Went to a wedding the other day",
        picturePath: "post-acea873b-2781-4aa3-90ca-0c9daacf3e6d.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: userIds[14], 
                comment: "Congratulations to Mikayla and Adrian!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[3],
        description:
        "what do you all think of this breakfast?",
        picturePath: "post-e7a13bc2-9e8c-4560-995e-37f8d2fe49ed.jpeg",
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
        picturePath: "post-43b3bd81-6d46-4c84-a5ab-56f417fe3cf2.jpeg",
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
        userId: userIds[13],
        description: "Fireworks!",
        picturePath: "post-772e3088-ce5d-4268-b979-9fc0f1c9cc56.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: userIds[11], 
                comment: "Its been a good festival season around here!"
            },
            {
                id: 1, userId: userIds[12], 
                comment: "Wooooo"
            },
            {
                id: 2, userId: userIds[13], 
                comment: "!!!!!!"
            },
            {
                id: 3, userId: userIds[14], 
                comment: "Sounds like a good time you're having!"
            },
            {
                id: 4, userId: userIds[10], 
                comment: "Wow! Any other photos?"
            },
            {
                id: 5, userId: userIds[9], 
                comment: "Coolio"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        description:
        "Just a short description. I'm tired of typing. I'm going to play video games now.",
        picturePath: "post-71748663-2261-4bf6-81c2-bf9a1da89c28.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: userIds[0], 
                comment: "Let's play sometime! ^-^"
            },
            {
                id: 1, userId: userIds[7], 
                comment: "Looked like you had a long day"
            },
            {
                id: 2, userId: userIds[3], 
                comment: "..."
            },
            {
                id: 3, userId: userIds[4], 
                comment: "Good night"
            },
            {
                id: 4, userId: userIds[5], 
                comment: "sounds nice ~~~!"
            },
            {
                id: 5, userId: userIds[1], 
                comment: "Had a fun time!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        description:
        "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
        picturePath: "post-003d5fb1-df7b-4392-b606-fb01e754c166.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: userIds[2], 
                comment: "Just get off"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[10],
        description:
        "Wedding Picture!!!",
        picturePath: "post-07445596-811a-4881-a1f2-a002636e74c9.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: userIds[7], 
                comment: "I wish you both well!"
            },
            {
                id: 1, userId: userIds[9], 
                comment: "O.O"
            },
            {
                id: 2, userId: userIds[4], 
                comment: "Congrats!"
            },
            {
                id: 3, userId: userIds[11], 
                comment: "Wooo!"
            },
            {
                id: 4, userId: userIds[0], 
                comment: "Have a good honeymoon!"
            },
        ],
    },
];

export const advertisements = [
    {
        id: 0,
        name: "MikaCosmetics",
        website: "mikacosmetics.com",
        picturePath: "advert-6aa27871-7ffc-4d28-9fa6-bdd75a636eb0.jpeg",
        description: "Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like light.",
    },
    {
        id: 1,
        name: "Popcorn Independent",
        website: "popcornindependent.com",
        picturePath: "advert-6911a647-db77-4c32-8e61-96b295b230c7.jpg",
        description: "Popcorn is a delicious snack that can be enjoyed by all. It's a great way to reduce stress and have some fun.",
    },
    {
        id: 2,
        name: "ParkCity Financials",
        website: "parkcity.net",
        picturePath: "advert-18027e36-736f-4ba8-830f-84764c16c9dd.jpg",
        description: "ParkCity Financials is a mobile app that helps users manage their finances in a simple and intuitive way.",
    },
    {
        id: 3,
        name: "Lamp Anonymous",
        website: "lampanonymous.com",
        picturePath: "advert-51834f8b-bccd-4d3f-9fef-b6b8acc123dd.jpg",
        description: "The lamp has a simple and elegant design, with a textured metal finish. The lamp is perfect for any room in the house.",
    },
    {
        id: 4,
        name: "Luminous Bamboo",
        website: "luminousbamboo.com",
        picturePath: "advert-8f2d2723-1415-43a5-b1f7-9f398beeefdf.jpg",
        description: "Bamboo furniture is an environmentally friendly choice that is perfect for any space. Our pieces are made from sustainable bamboo and are made to las.",
    },
    {
        id: 5,
        name: "Renegade Dynamics",
        website: "renegadedynamics.com",
        picturePath: "advert-2e8652a2-7921-42c7-aab3-8e06d9376c20.jpg",
        description: "We've designed our highest quality webcam yet - perfect for recording beautiful videos and photos in any environment.",
    },
];