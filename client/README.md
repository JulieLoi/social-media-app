# Frontend (React)
The frontend client is build using "create-react-app" as a React application.

There are three different pages that make up the client: the login/register page, the home page, and the profile page. Depending on various conditions, each page will have a different appearance based on the given data about the page the user wants to see.

The pages themselves are built from widgets and components that have different information or forms depending on whether or not the user is a guest user or is a logged in user and what the user wants to see in the given page.

## Run Client Frontend
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

# Sociology Pages
## Register / Login Page
The register / login page is the first page that guests are welcomed to. Here, guest users can either create a new account or log in with an existing account.

Following the tutorial, this page is build mostly as a form using [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) for both the register and login page. These two "pages" share the same Form component, using a different validation schema (Yup) depending on if the guest user wants to register an account or login.

<table>
   <tr>
      <th>Register Page</th>
      <th>Login Page</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216888710-a2e230e4-6f4e-4a8d-a7e2-12c61b74c5bb.png" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216889010-5e596908-b477-4fbc-9c72-cdc637cabdfb.png" /></td>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216887938-4cd7b49c-172f-49e9-be26-f669044d0b9c.gif" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216887942-77cf4df0-4ecd-46ff-b0ce-36bf0edd1d15.gif" /></td>
   </tr>
</table>

For this page, I updated the validation schema and had an error message appear for "wrong email or password". The "location" and "occupation" text fields have been made optional. Furthermore, the "location" value is built from selecting values for a country, state, and city, which used data from the library, [country-state-city](https://github.com/dr5hn/countries-states-cities-database).

<table>
   <tr>
      <th>Register Page (Errors)</th>
      <th>Login Page (Errors)</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216889946-6da6ef25-c64f-43d2-be8f-360348b9a288.gif" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216889723-29620f28-21e0-4015-ae11-c611e8f31148.gif" /></td>
   </tr>
</table>

### Navigation Bar
The navigation bar is present on both the home page and any profile page (navbar on login/register is separate). Similar to the navbar on the login/register page, if you click on the "Sociology" logo, it brings you to the home page (unless you already are on the home page).

#### Navigation Icons
There are four navigation icons on the bar:
 - Light/Dark Mode: Changes the light/dark mode of the website (found in the base tutorial)
 - Messages: Shows a box that displays "No Messages..." (no functionality)
 - Notifications: Shows a box that displays "No Notifications..." (no functionality)
 - Help: Displays a dialog box that will allow the user to download a pdf that consists of some accounts (email and passwords)

<table>
   <tr>
      <th>Navigation Bar Icons</th>
      <th>Navigation Bar "Logout"</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216891038-c9396511-4665-472f-a544-8cca4081e352.gif" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216891260-f32185a7-7f6b-4a3d-ba7e-129979b4ec2d.gif" /></td>
   </tr>
</table>

The last component on the navigation bar to the far right changes depending on whether or not the user is logged in or is a guest:
 - The guest user has a "Sign Up / Login" button that takes the user to the login/register page.
 - The logged in user has a "Select" component that displays the user's name and has a "Log Out" feature.

<table>
   <tr>
      <th>Guest User - "Sign up / Login"</th>
      <th>Logged In User - "Logout"</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216891601-d82c8419-e515-4970-9a80-32d6a85e2003.PNG" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216891594-4ad90692-3a2e-4306-bf7a-5ff9aacaec93.PNG" /></td>
   </tr>
</table>

#### Search Bar
The search bar originally serves as just decoration on the navigation bar from the original base tutorial. In this project, it is fully functional, allowing the user to search for a particular user account and going to the corresponding profile page.

<table>
   <tr>
      <th>Guest User Navigates Sociopedia</th>
      <th>Navigation Bar - Search Bar</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216890727-8032ed9e-20e7-44fc-8c84-ba8f97bb2b71.gif" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216892047-75bd603a-529b-49c3-99eb-a4f7a5f85045.gif" /></td>
   </tr>
</table>


## Home Page / Profile Page
The basic homepage consists of five widgets: User, MyPost, Posts, Advert, Friends List. As the homepage is moreso a collection of widgets positioned on the screen, the overall homepage is not very different from the base tutorial as most of the changes are in the widgets itself.

Similar to the home page, the profile page is simply a collection of widgets: User, Friends List (Profile User), MyPost (Profile User is logged in user), Posts (Profile User Posts Only).

<table>
   <tr>
      <th>Guest User - Home Page</th>
      <th>Logged In User - "Logout"</th>
      <th>Guest User - Profile Page</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216891601-d82c8419-e515-4970-9a80-32d6a85e2003.PNG" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216891594-4ad90692-3a2e-4306-bf7a-5ff9aacaec93.PNG" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216897264-d2b4e12a-dc88-4efe-bc82-a97fcc06d318.PNG" /></td>
   </tr>
</table>

# Widgets and Components
The widgets and components are what make the bulk of the project. Compared to the base tutorial, while there is no change in the widget count, this project has created more components to break down functionality for better usage.

## Advert Widget
In this project, the advert widget is a standalone component that is simply a randomized advert. While the base tutorial has a hardcoded advert, this project has advertisements stored in MongoDB and is randomly selected to be shown.

Additionally, a user can create an advert that will be stored and can randomly appear as an advert in the widget.

<table>
   <tr>
      <th>Creating an advert</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216887042-c2d54e9c-08f9-4dcb-9138-af6edbb3c6da.gif" /></td>
   </tr>
</table>


## Post Widgets (MyPost, Posts, Post)
### MyPost Widget
The mypost widget is available for a logged in user that allows the user to create a post. In the base project, the user could only upload an image for the post and the other options were unavailable.

In this project, the three other options are available for creating a post: Gifs (.gif), Attachments (.pdf), Audio Files (.ogg, .wav, .mp3)

### Post Widget
The post widget is what makes up a post. The base post widget from the tutorial consists of the following:
 - The post's user
 - An add/remove friend button
 - The post description (and a post image if given)
 - A like button (can like/dislike)
 - A comment button and comment section (preloaded data)
 - A share button (no functionality)

This project has added the following functionality for a post:
 - Handling files other than images (gifs, pdfs, audio files)
    - The pdf file is downloadable
    - The audio file can be played and downloaded
 - A date of the creation of the post
 - A functional share button (shares the Youtube tutorial link)
 - The ability for a user to delete their post
 - A contained comment section and the ability to post a comment


<table>
   <tr>
      <th>Creating the different types of posts</th>
      <th>Interacting with a post</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216894515-1e7c1a23-c67a-4fe7-9055-8fb038c06c1c.gif" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216894796-adc64195-7a9b-4a78-bc50-37705e21b39e.gif" /></td>
   </tr>
</table>

### Posts Widget
The posts widget consists of posts that is shown to the user (most recent at the top).
 - On the homepage, it shows all of the posts in the database
 - On a profile page, it shows all of the posts of the profile user

The main improvement for this widget is that a "Load More" feature was added as this widget was redesigned to only display 10 posts at first. Additionally, if there are no posts found, it would be mentioned.

<table>
   <tr>
      <th>No posts (profile page)</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216895488-471f8e58-4a3f-4cc0-84ab-36bf6b049975.png" /></td>
   </tr>
</table>

<table>
   <tr>
      <th>Show all posts (home page)</th>
      <th>Show all user posts (profile page)</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216895426-022e0556-d7e9-4724-bd77-a8a8ec90ec59.gif" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216895722-e5b5f86a-81fa-410b-b4ca-a0153a4c2683.gif" /></td>
   </tr>
</table>


## User Widget
The user widget consists of information about a the logged-in user on the homepage and a user on their profile page. Compared to the base tutorial's version, this project's user widget is nearly identical in appearance.

This improved user widget is mostly focused on the "Social Profiles", which can be linked to the user's twitter or linkedin account. The default link for either social profile is the home page for those social media platforms.

A logged-in user can update their account information (anything that has been done in the register page) and add their Social Profile handles.

<table>
   <tr>
      <th>Editting Account Settings and Looking at User Widget Interactions</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216896371-1504594a-4b25-40f3-a086-3279acd5caed.gif" /></td>
   </tr>
</table>

For a logged in user, their own user widget has an "account settings" button that is used to edit user information
For a logged in user, other user's profile user widget has an "add/remove" friend button.
For a guest user, there is nothing there.

<table>
   <tr>
      <th>Home Page User Widget (Logged in User)</th>
      <th>Profile Page User Widget (Logged in User)</th>
      <th>Profile Page User Widget (Another User)</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216895997-f6c0211d-c707-4c0a-a6e7-8c832c34b01f.PNG" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216895996-918d1217-d8d9-4d92-bf58-c5bc1d92c932.PNG" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216896002-5b449708-6687-4e1f-b17a-383a06d16e11.PNG" /></td>
   </tr>
</table>


## Friends List Widget
The friends list widget is simply a list of friends of a given user. While there is no change in appearance from the base tutorial's version, much of the functionality has been reworked and streamlined due to the fact that the "add"/"remove" friend functionality had only properly worked on the homepage.

This project has updated the "add"/"remove" friend feature to function properly on all widgets this component is found and will properly update the friends list widget. Additionally, the widget only shows a portion of the friends list, allowing the user to scroll through the list.

<table>
   <tr>
      <th>Adding/Removing Users as Friends on Profile Page</th>
      <th>Adding/Removing Users as Friends on Home Page</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/216882900-b125a582-5ccd-476d-8e54-1c80bb4a2752.gif" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/216883798-bde7a974-b618-4b50-90c6-9fe8fae1ffcf.gif" /></td>
   </tr>
</table>

# Mobile Version
The mobile version of the desktop web application adjusts the components to appear all in one column. The turial covered most of this project's mobile appearance.

The only major change is the inclusion of the search bar and the implementation of the navigation bar icons. Eveything else remains the same bar the improvements and upgrades made to the widgets.

<table>
   <tr>
      <th>Part 1</th>
      <th>Part 2</th>
      <th>Part 3</th>
      <th>Part 4</th>
      <th>Part 5</th>
   </tr>
   <tr>
      <td><img src="https://user-images.githubusercontent.com/113395605/217070409-649b1a0b-8533-41df-bc49-0d2574a346b3.png" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/217070417-47a8962b-60db-4826-94c9-d0375ef95fd2.png" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/217070418-1526a45a-a680-43f4-b01f-f60ce66d7df4.png" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/217070421-6757eef2-4313-43f5-bb9f-d3cea6dd5f46.png" /></td>
      <td><img src="https://user-images.githubusercontent.com/113395605/217070426-2054b9b4-f659-4e86-9b85-afa9abe465db.png" /></td>
   </tr>
</table>




