const { Reservation, User } = require("../models");

// Create Reservation
exports.createUser = async (req, res) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    // If an existing user is found, respond with an error
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user with data from the request body
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Users only for Admin
exports.getUsersAsAdmin = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.findAll();
    res.json(users);
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Current User
exports.getCurrentUser = async (req, res) => {
  try {
    // Get the user ID
    const userId = req.user.id;

    // Find the user by ID
    const currentUser = await User.findByPk(userId);

    // If the user is not found, send a 404 error
    if (!currentUser) {
      return res.status(404).json({ error: "user not found" });
    }
    // Return the user information
    res.status(200).json({ currentUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  Update Current User
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { note, numberOfGuests, date } = req.body;

  try {
    const userId = req.params.userId; // Get the user ID from the URL
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data with the information provided in the request body
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
    }
    await user.save();
    res.json({ message: "User updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//  Update User as Admin

exports.updateUserAsAdmin = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from the URL
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data with the information provided in the request body
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.isAdmin = req.body.isAdmin;

    await user.save();

    res.json({ message: "User updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from the URL
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
