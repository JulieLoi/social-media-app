# Layer 1: Telling Docker to use the node:17-alpine image as the base image for the container.
FROM node:17-alpine

# We use nodemon to restart the server every time there's a change
RUN npm install -g nodemon

# Layer 2: Telling Docker to create a directory called `app` in the container and set it as the working directory.
WORKDIR /app

# Layer 3: Copying the package.json file from the root of the project to the `app` directory in the container.
COPY ["package.json", "package-lock.json", "./"]

# Layer 4: Installing the dependencies listed in the package.json file.
RUN npm install --silent && \ 
    npm rebuild bcrypt --build-from-source 

# Layer 5: Copying all the files from the root of the project to the `app` directory in the container.
COPY . .

# Layer 6: Telling Docker that the container will listen on port 3001.
EXPOSE 3001

# Layer 7: Telling Docker to run the `npm run dev` command when the container is started.
CMD ["npm", "run", "dev"]

