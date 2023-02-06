# Backend (Express, Node, MongoDB)
The backend server contains the Express application (<code>index.js</code>). 

There are four different routers for the different backend API calls of the project: auth, users, posts, and advertisements. Each router has a corresponding controller JS file that contains functions that will execute an API call.

Likewise, the "models" folder contains three different Mongoose model schemas for a "User", a "Post", and an "Advertisement", which correlates to the three collections in the MongoDB.

## Run Server Backend
To run the backend server: `npm run start` or `npm run dev`

To test the backend server: `npm run test`

## Libraries
 * [Express](https://expressjs.com/): An open-source backend framework for building RESTful APIs with Node.js for web and mobile applications.
 * [Helmet](https://helmetjs.github.io/): A Node.js middleware th
 at helps secure Express applications by increasing HTTP header security.
 * [morgan](https://github.com/expressjs/morgan#readme): A Node.js middleware used to simplify the process of logging HTTP requests and errors.
 * [body-parser](https://github.com/expressjs/body-parser#readme): A Node.js middleware that processes and parses data sent in an HTTP request body (req.body property)
 * [cors](https://github.com/expressjs/cors#readme): A Node.js package that provides a Connect/Express middleware used to enable CORS.
 * [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme): A JS implementation of JSON web tokens, which is a compact, URL-safe means of representing claims to be transferred between the user and the host server.
 * [bcrypt.js](https://github.com/dcodeIO/bcrypt.js#readme): A JS library used for hashing passwords.
 * [gridfs-stream](https://github.com/aheckmann/gridfs-stream): A JS library that easily streams files to and from MongoDB GridFS.
 * [multer](https://github.com/expressjs/multer#readme): A Node.js middleware for handling multipart/form-data, which is primarily used for uploading files
 * [multer-gridfs-storage](https://github.com/devconcept/multer-gridfs-storage): A GridFS storage engine for Multer to store uploaded files directly to MongoDB.
 * [txtgen](https://github.com/ndaidong/txtgen): A lightweight JS utility library for generating random sentences.
 * [Dotenv](https://github.com/motdotla/dotenv#readme): A JS library that simply loads environment variables from a .env file into process.env.
 * [Mongoose](https://mongoosejs.com/): A Node-based object data modeling (ODB) library for MongoDB designed to work in an asynchronous environment.
 * [Jest](https://jestjs.io/): A JS testing solution library
 * [SuperTest](https://github.com/ladjs/supertest#readme): A JS module that provides a high-level abstraction for testing HTTP and allows the lower-level API provided by superagent.
 * [cross-env](https://github.com/kentcdodds/cross-env#readme): A JS library that allows you to run tests in the backend server as a single command without worrying about setting or using the environment variable properly for the platform.

# Parts of the Server
## Fake Data
The "data" folder contains a "<code>data.js</code>" file that serves as fake data to pass into a MongoDB. The fake data consists of a random number of "text only" posts and some hardcoded posts with attachment.

In the Express application (<code>index.js</code>), code for inserting fake data into the MongoDB is commented out.

## Server Assets
The "public/assets" folder contains all of the images, gifs, pdfs, and/or audio files for the server that the frontend uploads to and pulls from as the "path".

In this project, the different assets are divided by what category the uploaded file is for:
 - An image for a user profile picture is in the "users" folder.
 - A file (image, gif, pdf, audio file) for a post is in the "posts" folder.
 - An image for an ad is in the "advertisements" folder.

Furthermore, each uploaded file is renamed to a random name, allowing users to upload files with the same name and type without overriding it. Only pdf files and audio files keep their original name (for downloading) in the name.




