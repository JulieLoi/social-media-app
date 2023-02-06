


DO STUFF FOR A USER GUIDE, etc.

Deploy on site (render.com)

TESTING



# Sociopedia - Social Media App (MERN Stack)

This project is based on a complete fullstack (MERN) project tutorial on [Youtube by EdRoh](https://www.youtube.com/watch?v=K8YELRmUb5o), which creates a basic social media application with the following pages:

 * A register page with complete validation (along with functionality of uploading a user profile image) 
 * A functional login page that can be used to sign in to a home page.
 * A home page that contains five widgets:
    - "User Widget": Information about the user 
    - "MyPost Widget": Creating a post
    - "Posts Widget": All posts that has been made
    - "Advert Widget": An advertisment
    - "Friends List Widget": The user's friends list
 * A profile page that contains information about the profile user (any existing user), reusing the "User Widget", "Posts Widget" (all posts made by the profile user only), and "Friends List Widget".

The tutorial created a basic skeleton of the "Sociopedia" fullstack with working functionality for the following:
 * Registering an account
 * Logging into the website
 * Creating a post (with an image attachment)
 * Like/Dislike a post
 * Adding/Removing a friend
 * Dark/Light mode toggle

# MERN Stack Design
The designs of the project is all located in the "design" folder.

## High-Level Design
![User-MERN-Flow-Chart-1110x406](https://user-images.githubusercontent.com/113395605/216235558-130fe575-2106-482d-bde2-db2d9920383e.png)

## Database Models
The database models can be exampled in the <code>"database-models.uxf"</code> file that shows some of the basic models and object schemas for the project.

## Backend API
The APIs for the backend service is defined in the <code>"backend-api.pdf"</code> file where each API call includes the URI, HTTP method, the request params/body, and the response code/body.

# Deployment (render.com)
This project is deployed on [Render](https://render.com/) for both the frontend client and the backend server.

Render Deployment: ([Client](https://sociopedia-client.onrender.com))

# Docker
This project has Dockerfiles in order to package the entire software and run it from anywhere. The only issue had for building the docker images was in the "server" where the "bcrypt" package had to be replaced with "bcryptjs" and rebuilt in the Dockerfile.

<u>Docker Compose</u><br />
In order to build a Docker container that has images for the client and the server for the client, run the following in the root folder: `docker compose up`

To remove the docker container: `docker compose down --volumes`

<u>Docker Client</u><br />
In order to build a Docker image for the client only, run the following in the "client" folder: `docker build -t sociopedia-client .`

<u>Docker Server</u><br />
In order to build a Docker image for the server only, run the following in the "server" folder: `docker build -t sociopedia-server .`

<u>Docker Hub Images</u>
Furthermore, the Docker images are uploaded to the Docker Hub for [download](https://hub.docker.com/repository/docker/julieloileaf/sociopedia-demo/general).

# Testing



