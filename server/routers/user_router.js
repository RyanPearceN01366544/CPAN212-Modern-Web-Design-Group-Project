import express from "express";
import bcrypt from 'bcrypt';
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const user_router = express.Router();

// == R ==
// TODO: 
// Register -> Registers a user.
// Login -> Login the user with a token.
// GetCart -> Get the cart.
// GetUserInfo -> Get information about the current user or ID of a using.
user_router.post("/Register/", async (req, res) => {
    console.log("=== Registration Request ===");
    console.log("Request Body:", req.body);
    try {
        const { username, email, password, firstName, lastName } = req.body;
        console.log("Parsed Data:", { username, email, firstName, lastName });
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log("User already exists with email:", email);
          return res.status(400).json({ message: "User already exists" });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          firstName,
          lastName,
        });
    
        await newUser.save();
        console.log("User registered successfully:", { username, email });
        res.status(201).json({
          message: "User registered successfully",
        });
      } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error registering user" });
      }
});

user_router.post("/Login/", async (req, res) => {
    console.log("=== Login Request ===");
    console.log("Request Body:", req.body);
    try {
        const { login, password } = req.body;
        console.log("Login attempt with:", { login });
    
        // Check if the user exists (Using or to get either Username or Email.)
        const user = await User.findOne({ 
            $or:
            [
                {username: login},
                {email: login}
            ]
        });

        if (!user) {
          console.log("User not found with login:", login);
          return res.status(400).json({ message: "User not found! Please Register!" });
        }
    
        // Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log("Incorrect password for user:", login);
          return res.status(400).json({ message: "Incorrect Password!" });
        }
    
        // Generate JWT token
        const token = auth.generateToken(user);
        console.log("Login successful for user:", login);
    
        res.status(200).json({
          message: "Login successful",
          token,
        });
      } 
      catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error logging in" });
      }
    }
);

user_router.get("/Logout/", async(req, res) => {
    console.log("=== Logout Request ===");
    res.status(200).json({message: "You have been logged out."});
})


// R: Using prefix 'Get' before id... otherwise it thinks 'Register' is the :id.
user_router.get("/Get/", auth.verifyToken, (req, res) => { // R: Passing through verifyToken function...
    console.log("=== Get User Info Request ===");
    console.log("User:", req.user);
    if (req.user) { // R: Is the user existing? If so then...
        res.json(req.user);
    } // R: Otherwise, do nothing as verifyToken will stop them.
});

user_router.get('/Get/:id', auth.verifyToken, async(req, res) => { // R: Get Information obout user.
    console.log("=== Get User By ID Request ===");
    const userID = req.user; // R: Get the requesting user's id.
    const lookupID = req.params.id; // R: The user's information that is being requested.
    console.log("Looking up user:", lookupID);

    const requestingUser = await User.findById(userID); // R: The user requesting this information.
    const lookupUser = await User.findById(lookupID); // R: The user being looked up.

    if (!lookupUser) { // R: Check if the user exists.
        console.log("User not found:", lookupID);
        return res.status(404).json({ message: "User not found." });
    }

    res.json(lookupUser); // R: Return the user's information.
});

export default user_router;