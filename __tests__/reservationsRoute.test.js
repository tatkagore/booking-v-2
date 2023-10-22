const request = require("supertest");
const app = require("../app");

// TEST GET RESERVATION

describe("GET /api/reservation unauthenticated user", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/reservation")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("GET /api/reservation authenticated user", () => {
  let token;
  beforeEach(async () => {
    const res = await request(app)
      .post("/auth/signin")
      .expect("Content-Type", /json/)
      .send({
        email: "test@example.com",
        password: "password",
      })
      .expect(200);
    token = JSON.parse(res.res.text).message;
  });

  it("should return a success", async () => {
    const res = await request(app)
      .get("/api/reservation")
      .set({ Authorization: token })
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
