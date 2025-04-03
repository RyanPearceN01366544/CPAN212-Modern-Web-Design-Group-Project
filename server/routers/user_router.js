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
    console.log("Test");
    try {
        const { username, email, password, firstName, lastName } = req.body;
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
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
        res.status(201).json({
          message: "User registered successfully",
        });
      } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error registering user" });
      }
});

user_router.get("/Login/", async (req, res) => {
    try {
        const { login, password } = req.body;
    
        // Check if the user exists (Using or to get either Username or Email.)
        const user = await User.findOne({ 
            $or:
            [
                {username: login},
                {email: login}
            ]
        });

        if (!user) {
          return res.status(400).json({ message: "User not found! Please Register!" });
        }
    
        // Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Incorrect Password!" });
        }
    
        // Generate JWT token
        const token = auth.generateToken(user);
    
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
    res.status(200).json({message: "You have been logged out."});
})


// R: Using prefix 'Get' before id... otherwise it thinks 'Register' is the :id.
user_router.get("/Get/", auth.verifyToken, (req, res) => { // R: Passing through verifyToken function...
    if (req.user) { // R: Is the user existing? If so then...
        console.log(req.user);
        res.json(req.user);
    } // R: Otherwise, do nothing as verifyToken will stop them.
});

user_router.get('/Get/:id', auth.verifyToken, async(req, res) => { // R: Get Information obout user.
    const userID = req.user; // R: Get the requesting user's id.
    const lookupID = req.params.id; // R: The user's information that is being requested.

    const requestingUser = User.findById(userID); // R: The user requesting this information.
    const requestedUser = User.findById(lookupID); // R: The user we are looking for.

    if (requestingUser && requestedUser) { // R: Check if the user and user searching actually exists.
        console.log(requestingUser);
        console.log(requestedUser);
        if (requestingUser.permissions.includes("UserInformation")){
            res.json(requestedUser); // R: Just send all the data that should be accessible.
        }
        else{
            const filteredData_ = { // R: Basic User's Information Should Be Limited!
                username: requestedUser.username // R: I've seen options for allowing others to see their username based on the user's security settings.
            }
            res.json(filteredData_); // R: Doing this in case we have more data to send.
        }
    }
});
export default user_router;