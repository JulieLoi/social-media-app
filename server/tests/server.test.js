import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
import app from "../app";

// Environment Variables
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

// Before Test: Connect to database
beforeEach(async () => {
    await mongoose.connect(MONGO_URL);
});
  
// After Test: Close database connection
afterEach(async () => {
    await mongoose.connection.close();
});

describe("AUTH ROUTES", () => {

    // Good/Bad Register (Must Delete Email from Database - works the first time)
    // No Image Upload
    it("should try register (no image upload) - works the first time, then bad email error", async () => {
        const result = await request(app)
            .post("/auth/register")
            .send({
                firstName: "First", lastName: "Last",
                email: "example@gmail.com", password: "qe$9D764D1*J0@1iH",
                location: "United States", occupation: "Tester",
                picturePath: "user8db3fbffb86849d9b8b11c691c3501e3.jpeg"
            });

        // Check Result
        expect([201, 409]).toContain(result.statusCode);
    });

    // Bad Register (Existing Email - No Image Upload)
    it("should try register (no image upload) - works the first time, then bad email error", async () => {
        const result = await request(app)
            .post("/auth/register")
            .send({
                firstName: "First", lastName: "Last",
                email: "martinbaron@gmail.com", password: "qe$9D764D1*J0@1iH",
                location: "United States", occupation: "Tester",
                picturePath: "user8db3fbffb86849d9b8b11c691c3501e3.jpeg"
            });
        // Check Result
        expect(result.statusCode).toBe(409);
    });

    // Good Login
    it("should login succeed", async () => {
        const result = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });

        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Bad Login
    it("should login fail (wrong email/password)", async () => {
        const result = await request(app)
            .post("/auth/login")
            .send({
                email: "badexample@gmail.com",
                password: "badexample",
            });

        // Check Result
        expect(result.statusCode).toBe(400);
    });
});

describe("USERS ROUTES", () => {

    // Get all users
    it("gets all users", async () => {
        const result = await request(app)
            .get("/users/");
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Gets a user
    it("gets a user - success", async () => {
        const userId = "63dc78867ca65f023ca154a1";
        const result = await request(app)
            .get(`/users/${userId}`);
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Fails to get a user
    it("gets a user - fail", async () => {
        const userId = "badid";
        const result = await request(app)
            .get(`/users/${userId}`);
        
        // Check Result
        expect(result.statusCode).toBe(404);
    });

    // Gets a user's friends
    it("gets a user's friends - success", async () => {
        const userId = "63dc78867ca65f023ca154a1";
        const result = await request(app)
            .get(`/users/${userId}/friends`);
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Fails to get a user's friends
    it("gets a user's friends - fail", async () => {
        const userId = "badid";
        const result = await request(app)
            .get(`/users/${userId}/friends`);
        
        // Check Result
        expect(result.statusCode).toBe(404);
    });

    // Add/Remove a friend
    it("adds/removes a friend - success", async () => {

        // Token (Verification)
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Test Add/Remove Friend
        const userId = "63dc78867ca65f023ca154a1";
        const friendId = "63dc78867ca65f023ca15499";
        const result = await request(app)
            .patch(`/users/${userId}/${friendId}`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            });
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Fails add/remove friend (same IDs)
    it("adds/removes a friend - fail (same user/friend)", async () => {

        // Token (Verification)
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Test Add/Remove Friend
        const userId = "63dc78867ca65f023ca154a1";
        const friendId = "63dc78867ca65f023ca154a1";
        const result = await request(app)
            .patch(`/users/${userId}/${friendId}`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            });
        
        // Check Result
        expect(result.statusCode).toBe(405);
    });

    // Fail add/remove friend (bad IDs)
    it("adds/removes a friend - fail (bad IDs)", async () => {

        // Token (Verification)
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Test Add/Remove Friend
        const userId = "baduserid";
        const friendId = "badfriendid";
        const result = await request(app)
            .patch(`/users/${userId}/${friendId}`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            });
        
        // Check Result
        expect(result.statusCode).toBe(404);
    });

    // Update User Information (no image)
    it("updates user information - success", async () => {

        // Update User 
        const userId = "63dc78867ca65f023ca154a1";
        const getUser = await request(app).get(`/users/${userId}`);

        let user = getUser.body.user;
        user.twitterHandle = "PickleVet";

        // Token (Verification)
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;
        
        // Test Update User Information
        const result = await request(app)
            .patch(`/users/${userId}`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            })
            .send(user);
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Fails to Update User Information (bad ID)
    it("updates user information - fail (bad ID)", async () => {

        // Update User 
        const userId = "badid";
        const getUser = await request(app).get(`/users/63dc78867ca65f023ca154a1`);
        let user = getUser.body.user;

        // Token (Verification)
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;
        
        // Test Update User Information
        const result = await request(app)
            .patch(`/users/${userId}`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            })
            .send(user);
        
        // Check Result
        expect(result.statusCode).toBe(404);
    });

});

describe("POSTS ROUTES", () => {

    // Create Post (no image)
    it("create post", async () => {

        // Token (Verification)
        const userId = "63dc78867ca65f023ca154a1";
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Create Post
        const result = await request(app)
            .post("/posts")
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            })
            .send({
                userId: userId,
                description: "description",
                picturePath: ""
            });
        
        // Check Result
        expect(result.statusCode).toBe(201);
    });

    // Get All Posts
    it("get all posts", async () => {
        const result = await request(app)
            .get("/posts/");
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Get User Posts Only
    it("get user posts - success", async () => {
        const userId = "63dc78867ca65f023ca154a1";
        const result = await request(app)
            .get(`/posts/${userId}/posts`);
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Fails to Get User Posts Only (bad ID)
    it("get user posts - fail (bad userID)", async () => {
        const userId = "";
        const result = await request(app)
            .get(`/posts/${userId}/posts`);
        
        // Check Result
        expect(result.statusCode).toBe(404);
    });

    // Like/Dislike Post
    it("like/dislike post - success", async () => {

        // Token (Verification)
        const userId = "63dc78867ca65f023ca154a1";
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Get Random Post ID
        const getPosts = await request(app).get("/posts/");
        const post = getPosts.body.posts[0];
        const postId = post._id;

        // Like/Dislike Post
        const result = await request(app)
            .patch(`/posts/${postId}/like`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            })
            .send({ userId: userId });
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Fail Like/Dislike Post (Bad Post ID)
    it("like/dislike post - fail (bad post ID)", async () => {

        // Token (Verification)
        const userId = "63dc78867ca65f023ca154a1";
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Get Random Post ID
        const getPosts = await request(app).get("/posts/");
        const post = getPosts.body.posts[0];
        const postId = "bad post id";

        // Like/Dislike Post
        const result = await request(app)
            .patch(`/posts/${postId}/like`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            })
            .send({ userId: userId });
        
        // Check Result
        expect(result.statusCode).toBe(404);
    });

    // Comment on Post
    it("comment on post - success", async () => {

        // Token (Verification)
        const userId = "63dc78867ca65f023ca154a1";
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Get Random Post ID
        const getPosts = await request(app).get("/posts/");
        const post = getPosts.body.posts[0];
        const postId = post._id;

        // Like/Dislike Post
        const result = await request(app)
            .patch(`/posts/${postId}/like`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            })
            .send({ 
                userId: userId,
                comment: "random comment"
            });
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });

    // Fail Comment on Post (Bad Post ID)
    it("comment on post - fail (bad post ID)", async () => {

        // Token (Verification)
        const userId = "63dc78867ca65f023ca154a1";
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Get Random Post ID
        const postId = "bad post id";

        // Like/Dislike Post
        const result = await request(app)
            .patch(`/posts/${postId}/like`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            })
            .send({ 
                userId: userId,
                comment: "random comment"
            });
        
        // Check Result
        expect(result.statusCode).toBe(404);
    });

    // Delete Post 
    it("delete post - success", async () => {

        // Token (Verification)
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Get Random Post ID
        const getPosts = await request(app).get("/posts/");
        const post = getPosts.body.posts[0];
        const postId = post._id;

        // Delete Post
        const result = await request(app)
            .delete(`/posts/${postId}/delete`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            });
        
        // Check Result
        expect(result.statusCode).toBe(202);
    });

    // Delete Post (Bad Post ID)
    it("delete post - fail (bad post ID)", async () => {

        // Token (Verification)
        const login = await request(app)
            .post("/auth/login")
            .send({
                email: "martinbaron@gmail.com",
                password: "qe$9D764D1*J0@1iH",
            });
        const token = login.body.token;

        // Get Random Post ID
        const postId = "badid";

        // Delete Post
        const result = await request(app)
            .delete(`/posts/${postId}/delete`)
            .set({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            });
        
        // Check Result
        expect(result.statusCode).toBe(404);
    });

});

describe("ADVERTISEMENTS ROUTES", () => {

    // Get All Adverts
    it("get all adverts", async () => {
        const result = await request(app)
            .get("/advertisements/");
        
        // Check Result
        expect(result.statusCode).toBe(200);
    });
});


