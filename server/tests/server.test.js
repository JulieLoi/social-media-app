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


/*

describe("GET /api/activities", () => {

    // Get all activitites
    it("should get all the activities", async () => {

        // Create Token (for verifying token)
        const token = await request(app).post("/api/auth/login").send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        });
    
        // Get Activities
        const response = await request(app)
            .get("/api/activities")
            .set({
                Authorization: "bearer " + token.body.token,
                "Content-Type": "application/json",
            });
    
        // Check Result
        expect(response.statusCode).toBe(200);
        expect(response.body.activities.length).toBeGreaterThan(0);
    });

    // No token
    it("No token", async () => {

        // Bad Token!
        const token = "";
    
        // Get Activity
        const response = await request(app)
            .get("/api/activities")
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });
    
        // Check Result
        expect(response.statusCode).toBe(403);
    });

    // Invalid token
    it("No token", async () => {

        // Bad Token!
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNjc1NjQ3MTk2LCJleHAiOjE2NzU2NTQzOTZ9.d-VzTpNpccWcDNAkT5XQ10acgquJ55Fjny26sxBmhnY";
    
        // Get Activity
        const response = await request(app)
            .get("/api/activities")
            .set({
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
            });
    
        // Check Result
        expect(response.statusCode).toBe(401);
    });
});


describe("POST /api/activity", () => {

    // Add activity to database
    it("add an activity to database", async () => {
        // Token
        const token = await request(app).post("/api/auth/login").send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        });
    
        const response = await request(app)
            .post("/api/activity")
            .send({
                name: "Jogging",
                time: "3:00 PM",
            })
            .set({
                Authorization: "bearer " + token.body.token,
                "Content-Type": "application/json",
            });
    
        // Check Result
        expect(response.statusCode).toBe(201);
    });

    // Fail to add activity to database
    it("fail to add an activity to database", async () => {
        const token = await request(app).post("/api/auth/login").send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        });
    
        const response = await request(app)
            .post("/api/activity")
            .set({
                Authorization: "bearer " + token.body.token,
                "Content-Type": "application/json",
            });
    
        // Check Result
        expect(response.statusCode).toBe(400);
    });
});
  


describe("DELETE /api/:activityId/delete", () => {

    // Delete activity to database
    it("delete an activity to database", async () => {
        const token = await request(app).post("/api/auth/login").send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        });

        // Get Activities (get ID of last activity)
        const activities = await request(app)
            .get("/api/activities")
            .set({
                Authorization: "bearer " + token.body.token,
                "Content-Type": "application/json",
            });

        const lastElement = (activities.body.activities.slice(-1));
        const activityId = lastElement[0]._id;

        // Delete Activity
        const response = await request(app)
            .delete(`/api/${activityId}/delete`)
            .set({
                Authorization: "bearer " + token.body.token,
                "Content-Type": "application/json",
            });


        // Check Result
        expect(response.statusCode).toBe(202);
        
    });

    // Fail to activity to database
    it("fail to delete an activity to database", async () => {
        const token = await request(app).post("/api/auth/login").send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        });

        const activityId = "faildelete";

        // Delete Activity
        const response = await request(app)
            .delete(`/api/${activityId}/delete`)
            .set({
                Authorization: "bearer " + token.body.token,
                "Content-Type": "application/json",
            });

        // Check Result
        expect(response.statusCode).toBe(404);
        
    });
});

*/