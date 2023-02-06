

# Possible Features to add

# Docker
docker build -t clientapp . 

VOLUMES:
docker run --name sociopedia_client_c -p 3000:3000 -v C:\Users\19163\Documents\GitHub\social-media-app\client:/app -v /app/node_modules sociopedia_client


docker build -t serverapp .
docker run --name sociopedia_server_c -p 3001:3001 -v C:\Users\19163\Documents\GitHub\social-media-app\server:/app -v /app/node_modules sociopedia_server


To run docker compose: `docker compose up`
To close docker: `docker compose down --volumes`

TEST REACT 
TEST SERVER!

In server testing, .env has two mongourls (has database name I want for both)

ADD .ENV (USE GIT IGNORE) IN CLIENT
https://stackoverflow.com/questions/49579028/adding-an-env-file-to-a-react-project
https://stackoverflow.com/questions/48378337/create-react-app-not-picking-up-env-files



Things to do:
-Redo Login/Register (done)


Make create friend requests?


HANDLE DUPLICATE EMAIL IN THE SYSTEM (CANNOT USE THE SAME EMAIL AGAIN!)
-DONE




# Frontend (React)

# Run Client Frontend
To build the frontend client: `npm run build`

To run the frontend client: `npm run start`

To test the frontend client: `npm run test`


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
 * [country-state-city](https://github.com/dr5hn/countries-states-cities-database): Contains data for countries, their states, and their cities





