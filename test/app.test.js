import request from 'supertest'
import app from '../src/app.js'

describe("GET /forecast", () => {
    const agent = request.agent(app);

    describe("no data provided", () => {
        it("should respond with a 400 status code", async () => {
            const response = await agent.get("/forecast");
            expect(response.statusCode).toBe(400);
        })

        it("should response in json format", async () => {
            const response = await agent.get("/forecast");
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        })
    })

    describe("latitude and longitude provided", () => {
        it("should respond with a 400 status code", async () => {
            const response = await agent.get("/forecast").query({ latitude: -92, longitude: 0 });
            expect(response.statusCode).toBe(400);
        })

        it("should respond with a 400 status code", async () => {
            const response = await agent.get("/forecast").query({ latitude: 0, longitude: 182 });
            expect(response.statusCode).toBe(400);
        })

        it("should respond with a 200 status code", async () => {
            const response = await agent.get("/forecast").query({ latitude: 0, longitude: 0 });
            expect(response.statusCode).toBe(200);
        })
    })
})