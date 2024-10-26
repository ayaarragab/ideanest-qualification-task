import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../src/index";

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/ideanest-task');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Test index.ts", () => {
    test("Catch-all route", async () => {
        const requestBody = {
            email: "testuser@example.com",
            password: "12@@aA--",
        };

        const res = await request(app)
            .post("/api/signin")
            .send(requestBody)
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
    }, 20000);
});

  
