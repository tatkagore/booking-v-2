const request = require("supertest");
const app = require("../app");

// TEST POST SIGNIN
describe("POST /auth/signin", () => {
  it("should return a signin token", async () => {
    const res = await request(app)
      .post("/auth/signin")
      .expect("Content-Type", /json/)
      .send({
        email: "test@example.com",
        password: "password",
      })
      .expect(200);
  });

  it("should deny wrong password", async () => {
    const res = await request(app)
      .post("/auth/signin")
      .expect("Content-Type", /json/)
      .send({
        email: "test@example.com",
        password: "azerty",
      })
      .expect(400);
  
    const responseJson = res.body;
  
    // Assuming your server returns an error message in a specific format
    expect(responseJson).toHaveProperty('message');
    expect(responseJson.message).toBe("Nom d'utilisateur ou mot de passe incorrect"); // Replace with the actual error message you expect
  });

  it("should deny not existing user", async () => {
    const res = await request(app)
      .post("/auth/signin")
      .expect("Content-Type", /json/)
      .send({
        email: "anything@example.com",
        password: "azerty",
      })
      .expect(400);
  
    const responseJson = res.body;
  
    // Assuming your server returns an error message in a specific format
    expect(responseJson).toHaveProperty('message');
    expect(responseJson.message).toBe("Nom d'utilisateur ou mot de passe incorrect"); // Replace with the actual error message you expect
  });
});
