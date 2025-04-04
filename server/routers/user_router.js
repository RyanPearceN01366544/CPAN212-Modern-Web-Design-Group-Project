import express from "express";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const user_router = express.Router();

// == R ==
// TODO:  
// Register -> Registers a user. (DONE)
// Login -> Login the user with a token. (DONE)
// ForgotPassword -> When the user wants to send a password reset request. (WIP)
// ResetPassword -> When the user resets their password. (WIP)
// GetCart -> Get the cart. 
// GetUserInfo -> Get information about the current user or ID of a using.

// == EMAIL STUFF == <- R
const transporter = nodemailer.createTransport({ // R: Creates an Email!
  host: process.env.EMAIL_SERVICE,
  port: 465,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
  }
})
let mailOptions = {};
const setMailOptions = (to_, resetLink_) => { // R: The Information In Mail Reset.
  mailOptions = {
    from: `"ShopEase Support Employee" <${process.env.EMAIL_USER}>`,
    to: to_,
    subject: "Password Reset",
    text: 'Click the following link to reset your password: http://localhost:5173/Reset-Password/...', // Plain text fallback
    html: `<p>Click <a href="${resetLink_}">here</a> to reset your password</p>`
  }
}


// == ROUTES == <- R
user_router.post("/Register", async (req, res) => {
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

user_router.get("/Login", async (req, res) => {
    try {
        const { login, password } = req.body;
    
        // R: Check if the user exists (Using or to get either Username or Email.)
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
    
        // r: Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Incorrect Password!" });
        }
    
        // r: Generate JWT token
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
user_router.get("/Logout", async(req, res) => {
  res.status(200).json({message: "You have been logged out."});
})

user_router.post("/ForgotPassword", async(req, res) => {
  const {email} = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
  {
    const token = jwt.sign(
      {
        // R: -- Insert Email into Token --
        email: existingUser.email,
      },
      process.env.JWT_SECRET, // R: --> Process Secret
      { expiresIn: '2h'} // R: --> 2 Hours.
    );
    setMailOptions(email, `http://localhost:5173/Reset-Password/${token}`);
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (err_, info_) => {
      if (err_){
        console.log(err_);
        console.log(err_.name);
        console.log(err_.cause);
        console.log(err_.message);
      }
      else{
        console.log(info_);
      }
    });
    res.json({resetPasswordToken: token});
  }
  else {
    res.status(401).json({message: "User doesn't exist!"})
  }
})
user_router.post("/ResetPassword", async(req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  const {email, newPassword} = req.body;

  if (!token) {
    return res.status(401).json({message: "Authorization token required!"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_ = User.findOne({email});
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (user_ && decoded) {
      User.findOneAndUpdate({email}, {$set: {password: hashedPassword}});
    }
    else{
      return res.status(401).json({message: "User doesn't exist!"});
    }
  }
  catch (err){
    return res.status(400).json({message: "Invalid or expired token!"});
  }
});


// R: Using prefix 'Get' before id... otherwise it thinks 'Register' is the :id.
user_router.get("/Get", auth.verifyToken, (req, res) => { // R: Passing through verifyToken function...
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