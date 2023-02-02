# Sociology - Social Media App (MERN Stack)

This project is based on a complete fullstack (MERN) project tutorial on [Youtube by EdRoh](https://www.youtube.com/watch?v=K8YELRmUb5o), which creates a basic social media application with the following pages:

 * A register page with complete validation (along with functionality of uploading a user profile image) 
 * A functional login page that can be used to sign in to a home page.
 * A home page that contains four widgets:
    - "User Widget": Information about the user 
    - "Posts Widget": All posts that has been made
    - "Advert Widget": An advertisment
    - "Friends List Widget": The user's friends list
 * A profile page that contains information about the profile user (any existing user), reusing the "User Widget", "Posts Widget" (all posts made by the profile user only), and "Friends List Widget".

The tutorial created a basic skeleton of the "Sociology" fullstack with working functionality for the following:
 * Registering an account
 * Logging into the website
 * Creating a post (with an image attachment)
 * Like/Dislike a post
 * Adding/Removing a friend
 * Dark/Light mode toggle

# Sociology Pages
## Register / Login Page
The register / login page is the first page that guests are welcomed to. Here, guest users can either create a new account or log in with an existing account.

Following the tutorial, this page is build mostly as a form using [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) for both the register and login page. These two "pages" share the same Form component, using a different validation schema (Yup) depending on if the guest user wants to register an account or login.

### Improvements

- Talk about how it was built and how I improved it...




# Navigation Bar
-Home page, Profile Page

-Other icons work (message, notifications, help)
-SEARCH BAR WORKS (add search bar in mobile)

## Search Bar
- Alphabetical order
- click, go to profile page of the user
- SHOWN IN MOBILE SCREEN

#### Navigation ICons




## Home Page
- Talk about what it consists of.
- I didn;t do much to the page itself, but did update the widgets...

## User Widget
 - Social Media Profiles (linked to twitter / linkedin)
 - Edit Accoutn Settings (can change user information (profile pic too))

## Advert
 - Ability to create an ad
 -Random ad displays (fake data for more)


# My Post Widget
 - Ability to attach gif, audio, pdf file

# POSTS WIDGET
-load more feature
-most recent at the top

## Post
- added the ability to add comments
- added ability to delete a post you made
- added ability to share (simply shares the youtube tutorial link on four platforms)
- Comment section is limited and can be scrolled

## Friends List
- Friends List section is limited and can be scrolled


## Profile Page


# Widgets / Components

# STUFF IN GENERAL
-FAKE DATA ADDED
-DATA MODEL UXF (Made it)
-MAKE OTHER STUFF FOR THE PROJECT (BASED ON OLD CLASS STUFF)
-NAV TOP (REACT)

 - Fixed ADDING REMOVING FRIENDS (did not work properly other than on home page)
- LOCATION COMPONENT (uses a library for selecting a location in register and edit user settings)



# Frontend (React)
## Libraries

 * [Material UI](https://mui.com/): An open-source React UI component library that implements Google's Material Design.
 * [Emotion](https://emotion.sh/docs/introduction): A (React) library designed for writing css styles with JavaScript.
 * [Sass](https://sass-lang.com/): A CSS extension language used to style the React H5 Audio Player component.
 * [Formik](https://formik.org/): An open-source library used to build forms in React and React Native.
 * [Yup](https://github.com/jquense/yup): A schema builder library used for form validation, handling runtime value parsing and validation.
 * [React Dropzone](https://react-dropzone.js.org/): A React library for handling files using a drap-and-drop zone for the files.
 * [React H5 Audio Player](https://github.com/lhz516/react-h5-audio-player): A React audio player component with consistent UI/UX on different browsers.
 * [JS File Download](https://github.com/kennethjiang/js-file-download): A JS function used to trigger the browser to save data to file as if it was downloaded.
 * [Axios](https://github.com/axios/axios): A promise-based HTTP client for the browser and node.js, used for the JS File Download library.
 * [React Share](https://github.com/nygardk/react-share#readme): A React library designed for social media share buttons and share counts.
 * [React Redux](https://react-redux.js.org/): The official React library for using Redux, allowing React components to read data from a Redux store and dispatch actions to the store to update the state.
 * [Redux Toolkit](https://redux-toolkit.js.org/): The official and recommended toolkit for efficient and easier Redux development.
 * [Redux Persists](https://github.com/rt2zz/redux-persist#readme): A redux library that is used to selectively store state into local storage if needed.
 * [React Router](https://reactrouter.com/en/main): A React library that enables "client-side routing", rendering new React UI and making data requests to update the new UI with new information.
 * [uuid](https://github.com/uuidjs/uuid#readme): Generates RFC4122 UUIDs for file upload names




# Backend (Express, Node, MongoDB)
## Libraries

 * [Express](https://expressjs.com/): An open-source backend framework for building RESTful APIs with Node.js for web and mobile applications.
 * [Helmet](https://helmetjs.github.io/): A Node.js middleware that helps secure Express applications by increasing HTTP header security.
 * [morgan](https://github.com/expressjs/morgan#readme): A Node.js middleware used to simplify the process of logging HTTP requests and errors.
 * [body-parser](https://github.com/expressjs/body-parser#readme): A Node.js middleware that processes and parses data sent in an HTTP request body (req.body property)
 * [cors](https://github.com/expressjs/cors#readme): A Node.js package that provides a Connect/Express middleware used to enable CORS.
 * [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme): A JS implementation of JSON web tokens, which is a compact, URL-safe means of representing claims to be transferred between the user and the host server.
 * [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme): A JS library used for hashing passwords.
 * [gridfs-stream](https://github.com/aheckmann/gridfs-stream): A JS library that easily streams files to and from MongoDB GridFS.
 * [multer](https://github.com/expressjs/multer#readme): A Node.js middleware for handling multipart/form-data, which is primarily used for uploading files
 * [multer-gridfs-storage](https://github.com/devconcept/multer-gridfs-storage): A GridFS storage engine for Multer to store uploaded files directly to MongoDB.
 * [txtgen](https://github.com/ndaidong/txtgen): A lightweight JS utility library for generating random sentences.
 * [Dotenv](https://github.com/motdotla/dotenv#readme): A JS library that simply loads environment variables from a .env file into process.env.
 * [Mongoose](https://mongoosejs.com/): A Node-based object data modeling (ODB) library for MongoDB designed to work in an asynchronous environment.




