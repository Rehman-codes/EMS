const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const connectDB = require("../config/db");

jest.setTimeout(30000); // Increase timeout to 30 seconds

let testUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "password123"
};

beforeAll(async () => {
    await connectDB(); // Ensure database is connected before tests
});

describe("Auth Routes", () => {
    afterAll(async () => {
        await mongoose.connection.close(); // Close DB after tests
    });

    test("Should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token");
    });

    test("Should not allow duplicate user registration", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error", "User already exists");
    });

    test("Should login an existing user", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    test("Should not login with invalid credentials", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: testUser.email,
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("error", "Invalid credentials");
    });
});
