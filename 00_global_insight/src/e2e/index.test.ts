import request from "supertest";
import { createApp } from "../createApp";
import { Express } from "express";
describe("/api/users", () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  it("should return an empty array when getting /api/users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.body).toStrictEqual([]);
  });
  it("should NOT return an array when getting /api/users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.body).not.toStrictEqual(["1", "2"]);
  });
});
