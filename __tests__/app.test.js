const request = require("supertest");
const app = require("../app");

// TEST GET RESERVATION

describe("GET /api/reservation", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/reservation")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

// TEST POST SIGNIN
describe("POST /auth/signin", () => {
  it("should return a signin", async () => {
    const res = await request(app)
      .post("/auth/signin")
      .expect("Content-Type", /json/)
      .send({
        email: "email@bella",
        password: "password",
      })
      .expect(200);
  });
});
