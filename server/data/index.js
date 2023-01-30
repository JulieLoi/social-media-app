import mongoose from "mongoose";
import { sentence } from 'txtgen';

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

// Get random user id 
const getRandomUserId = () => {
    return userIds[Math.floor((Math.random() * userIds.length))];
}

// Generate 10 - 25 posts (no files)
const generatePosts = () => {
    const randomAmount = Math.floor(Math.random() * 15)  + 10;  // 10 - 25
    const randomPosts = [];
    
    for(let i = 0; i < randomAmount; i++) {

        // Create Comments
        const randomCommentAmount = Math.floor(Math.random() * 20);     // 0 - 20
        const randomComments = [];
        
        for(let i = 0; i < randomCommentAmount; i++) {
            randomComments.push(
                {
                    id: i, userId: getRandomUserId(), 
                    comment: sentence()
                }
            )
        }

        // Create New Post
        const newPost = {
            _id: new mongoose.Types.ObjectId(),
            userId: getRandomUserId(),
            description: sentence(),
            picturePath: "",
            likes: getRandomLikes(userIds),
            comments: randomComments,
        }

        randomPosts.push(newPost);
    }

    return randomPosts;
}

// Shuffle Posts Array
const shuffleArray = (array) => {

    let myArray = [...array]

    for (let i = myArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
    }
    return myArray;
}

export const users = [
    {
        _id: userIds[0],
        firstName: "Alexis",
        lastName: "Speilgar",
        email: "alexisspeilgar@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "user395bb1774ebd439c973a83b83147f64c.jpeg",
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
        picturePath: "usera27bb7b4565742a6b5f9970e87fa80a9.jpeg",
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
        picturePath: "user56f084f197d5460c8fd4ad40568efce3.jpeg",
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
        picturePath: "userbfa9f582bafa445eac72bf2899c576db.jpeg",
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
        picturePath: "user8db3fbffb86849d9b8b11c691c3501e3.jpeg",
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
        picturePath: "user21093bc7060149c3aa606a5a59480842.jpeg",
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
        picturePath: "user78f13b950bf54f1e8b3f2f30470cff5a.jpeg",
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
        picturePath: "user79016e68712d429a94f5653f9b7a48ba.jpeg",
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
        picturePath: "userb5d53f2131b6407494b461fd521dbb9d.jpg",
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
        picturePath: "userec5da2e1d6b3488d9849e6d675ba34a6.jpg",
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
        picturePath: "user74d5171330f9429a968e7dac5212b0ad.jpg",
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
        picturePath: "user9ef6ef04323d4ab7baeeb9424ddcf603.jpg",
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
        picturePath: "user2057bd8d1ddf47a2816c50a3fb6b324f.jpg",
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
        picturePath: "userf1434f3ca1df450db7ccf6f4a03e21e6.jpg",
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
        password: "$2b$10$f4T8ofxhQdaoLPgEFqXfE.wDNNWjla/qZ.5ZBiNYkARSSClw9u61u",
        picturePath: "user1f8cd347b8b047789d1229753e88f12f.jpg",
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

const postsWithFiles = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: getRandomUserId(),
        description: "A good breakfast to start the day!",
        picturePath: "postea585252dfad4e809ccfc1dbb9d9cc8f.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "Good looking salad!"
            },
            {
                id: 1, userId: getRandomUserId(), 
                comment: "orange juice is a great way to start the day"
            },
            {
                id: 2, userId: getRandomUserId(), 
                comment: "Let's have breakfast together later on"
            },
            {
                id: 3, userId: getRandomUserId(), 
                comment: "Try having a breakfast salad with an egg next time!"
            },
            {
                id: 4, userId: getRandomUserId(), 
                comment: "Have a good day!"
            },
            {
                id: 5, userId: getRandomUserId(), 
                comment: "i prefer apple juice"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: getRandomUserId(),
        description:
        "Went to a wedding the other day",
        picturePath: "postacea873b27814aa390ca0c9daacf3e6d.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "Congratulations to Mikayla and Adrian!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: getRandomUserId(),
        description:
        "what do you all think of this breakfast?",
        picturePath: "poste7a13bc29e8c4560995e37f8d2fe49ed.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(),
                comment: "i hope you had more than that"
            },
            {
                id: 0, userId: getRandomUserId(), 
                comment: "Looks really good!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: getRandomUserId(),
        description:
        "Jane Doe here having a blast at the local festival!",
        picturePath: "post43b3bd816d464c84a5ab56f417fe3cf2.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(),
                comment: "Utah sure knows how to throw a festival!"
            },
            {
                id: 1, userId: getRandomUserId(), 
                comment: "What city is this in Jane?"
            },
            {
                id: 2, userId: getRandomUserId(), 
                comment: "Salt Lake City!"
            },
            {
                id: 3, userId: getRandomUserId(), 
                comment: "It looks amazing! I would love to put it on my bucket list!"
            },
            {
                id: 4, userId: getRandomUserId(), 
                comment: "I want to check this place out!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[13],
        description: "Fireworks!",
        picturePath: "post772e3088ce5d4268b9799fc0f1c9cc56.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "Its been a good festival season around here!"
            },
            {
                id: 1, userId: getRandomUserId(), 
                comment: "Wooooo"
            },
            {
                id: 2, userId: getRandomUserId(), 
                comment: "!!!!!!"
            },
            {
                id: 3, userId: getRandomUserId(), 
                comment: "Sounds like a good time you're having!"
            },
            {
                id: 4, userId: getRandomUserId(), 
                comment: "Wow! Any other photos?"
            },
            {
                id: 5, userId: getRandomUserId(), 
                comment: "Coolio"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        description:
        "Just a short description. I'm tired of typing. I'm going to play video games now.",
        picturePath: "post7174866322614bf681c2bf9a1da89c28.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "Let's play sometime! ^^"
            },
            {
                id: 1, userId: getRandomUserId(), 
                comment: "Looked like you had a long day"
            },
            {
                id: 2, userId: getRandomUserId(), 
                comment: "..."
            },
            {
                id: 3, userId: getRandomUserId(), 
                comment: "Good night"
            },
            {
                id: 4, userId: getRandomUserId(), 
                comment: "sounds nice ~~~!"
            },
            {
                id: 5, userId: getRandomUserId(), 
                comment: "Had a fun time!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        description:
        "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
        picturePath: "post003d5fb1df7b4392b606fb01e754c166.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "Just get off"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[10],
        description: "Wedding Picture!!!",
        picturePath: "post07445596811a4881a1f2a002636e74c9.jpeg",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "I wish you both well!"
            },
            {
                id: 1, userId: getRandomUserId(), 
                comment: "O.O"
            },
            {
                id: 2, userId: getRandomUserId(), 
                comment: "Congrats!"
            },
            {
                id: 3, userId: getRandomUserId(), 
                comment: "Wooo!"
            },
            {
                id: 4, userId:getRandomUserId(), 
                comment: "Have a good honeymoon!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[2],
        description: "Piano Cat",
        picturePath: "post16863ad4afc14ef4853e2188303e07a0.gif",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "(•‿•)"
            },
            {
                id: 1, userId: getRandomUserId(), 
                comment: "(๑´• .̫ •ू`๑)"
            },
            {
                id: 2, userId: getRandomUserId(), 
                comment: "⸂⸂⸜(രᴗര๑)⸝⸃⸃"
            },
            {
                id: 3, userId: getRandomUserId(), 
                comment: "(◐ω◑ )"
            },
            {
                id: 4, userId: getRandomUserId(), 
                comment: "꒰ღ˘‿˘ற꒱❤⃛"
            },
            {
                id: 5, userId: getRandomUserId(), 
                comment: "◝(๑꒪່౪̮꒪່๑)◜"
            },
            {
                id: 6, userId: getRandomUserId(), 
                comment: "Ⴚტ◕‿◕ტჂ"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[14],
        description: "Crickets I recorded last night",
        picturePath: "postaea0b54bfeee471c942a7257bd15da4ecricket_sounds.wav",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "Those crickets must have been loud."
            },
            {
                id: 1, userId: getRandomUserId(), 
                comment: "Downloaded it!"
            },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[5],
        description: "Dummy PDF",
        picturePath: "post65cb3cd33b3c42f4864e1097c0e126fdDummyPDF.pdf",
        likes: getRandomLikes(userIds),
        comments: [
            {
                id: 0, userId: getRandomUserId(), 
                comment: "Dummy comment"
            },
            {
                id: 1, userId: getRandomUserId(), 
                comment: "Downloaded it!"
            },
        ],
    },
];

const postsWithoutFiles = generatePosts();
const mergedPosts = [...postsWithFiles, ...postsWithoutFiles];
export const posts = shuffleArray(mergedPosts);

export const advertisements = [
    {
        id: 0,
        name: "MikaCosmetics",
        website: "mikacosmetics.com",
        picturePath: "advert6aa278717ffc4d289fa6bdd75a636eb0.jpeg",
        description: "Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like light.",
    },
    {
        id: 1,
        name: "Popcorn Independent",
        website: "popcornindependent.com",
        picturePath: "advert6911a647db774c328e6196b295b230c7.jpg",
        description: "Popcorn is a delicious snack that can be enjoyed by all. It's a great way to reduce stress and have some fun.",
    },
    {
        id: 2,
        name: "ParkCity Financials",
        website: "parkcity.net",
        picturePath: "advert18027e36736f4ba8830f84764c16c9dd.jpg",
        description: "ParkCity Financials is a mobile app that helps users manage their finances in a simple and intuitive way.",
    },
    {
        id: 3,
        name: "Lamp Anonymous",
        website: "lampanonymous.com",
        picturePath: "advert51834f8bbccd4d3f9fefb6b8acc123dd.jpg",
        description: "The lamp has a simple and elegant design, with a textured metal finish. The lamp is perfect for any room in the house.",
    },
    {
        id: 4,
        name: "Luminous Bamboo",
        website: "luminousbamboo.com",
        picturePath: "advert8f2d2723141543a5b1f79f398beeefdf.jpg",
        description: "Bamboo furniture is an environmentally friendly choice that is perfect for any space. Our pieces are made from sustainable bamboo and are made to las.",
    },
    {
        id: 5,
        name: "Renegade Dynamics",
        website: "renegadedynamics.com",
        picturePath: "advert2e8652a2792142c7aab38e06d9376c20.jpg",
        description: "We've designed our highest quality webcam yet  perfect for recording beautiful videos and photos in any environment.",
    },
];