const request = require("supertest");
const app = require("../app");

describe("GET /api/user/me without token", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/user/me")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("GET /api/user/me with token", () => {
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
      .get("/api/user/me")
      .set({ Authorization: token })
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
