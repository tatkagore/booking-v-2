const sequelize = require("../db");
const { User } = require("../db.js");
const bcrypt = require("bcrypt");

async function seedDatabase() {
  try {
    await seedData();
  } catch (error) {
    console.error("Erreur lors de la création de seeds :", error);
  }
}

async function seedData() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("password", salt);
  User.create({
    isAdmin: false,
    firstName: "bob",
    lastName: "",
    phoneNumber: "",
    username: "test",
    email: "test@example.com",
    password: hashedPassword,
  });
}

seedDatabase();
