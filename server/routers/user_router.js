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

// R: == ROUTES ==
// R: -- REGISTRY --
user_router.put("/Register", async (req, res) => {
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
        const defaultPrivacySettings_ = {
          hideEmail: true,
          hideGender: true,
          hideFirstName: true,
          hideLastName: true,
        }

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          gender: "Not Set",
          firstName,
          lastName,
          address: "",
          balance: 0.0,
          cart: [],
          privacySettings: defaultPrivacySettings_,

          permissionLevel: 0, // R: Basic User
        });
    
        await newUser.save();
        console.log("User registered successfully:", { username, email });
        res.status(201).json({
          message: "User registered successfully",
        });
      } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error Registering User!" });
      }
});
user_router.post("/Login", async (req, res) => {
    try {
        const { login, password } = req.body;
        console.log("Login attempt with:", { login });
    
        // R: Check if the user exists (Using or to get either Username or Email.)
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
    
        // r: Compare the passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log("Incorrect password for user:", login);
          return res.status(400).json({ message: "Incorrect Password!" });
        }
    
        // r: Generate JWT token
        const token = auth.generateToken(user);
        console.log("Login successful for user:", login);
    
        res.status(200).json({
          message: "Login successful",
          token,
        });
      } 
      catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error Logging Into Account!" });
      }
    }
);
user_router.get("/Logout", async(req, res) => {
  res.status(200).json({message: "You have been logged out."});
})
// R: -- FORGOT/CHANGE PASSWORD --
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
      return res.status(401).json({message: "User Doesn't Exist!"});
    }
  }
  catch (err){
    return res.status(400).json({message: "Invalid or Expired Token!"});
  }
});

// -- USER DATA & MANAGEMENT --
// R: Using prefix 'Info' before id... otherwise it thinks 'Register' or other routes are the :id.
// R: The route below this is for the user requesting information of their own account.
user_router.get("/Info", auth.verifyToken, (req, res) => { // R: Passing through verifyToken function...
    if (req.user) { // R: Is the user existing? If so then...
        res.json(req.user);
    } // R: Otherwise, do nothing as verifyToken will stop them.
});
// R: The route below is the same as above but it's when a user requests the data of a specific user.
user_router.get("/Info/:id", auth.verifyToken, async(req, res) => { // R: Get Information obout user.
    const userID = req.user.userID; // R: Get the requesting user's id.
    const lookupID = req.params.id; // R: The user's information that is being requested.

    const requestingUser = await User.findById(userID); // R: The user requesting this information.
    const lookupUser = await User.findById(lookupID); // R: The user being looked up.

    if (!lookupUser) { // R: Check if the user exists.
        console.log("User not found:", lookupID);
        return res.status(404).json({ message: "User not found." });
    }
    // R: Continue and get the privacy settings versus permissions.
    let dataToSend_ = {};
    if (requestingUser.permissionLevel >= 2 && requestingUser.permissionLevel > lookupUser.permissionLevel) { 
    // R: Allow them to see all as a trusted employee or Manager unless theirs is higher.
      dataToSend_ = {
        username: lookupUser.username,
        email: lookupUser.email,
        gender: lookupUser.gender,
        firstName: lookupUser.firstName,
        lastName: lookupUser.lastName,
        address: lookupUser.address
      }
    }
    else { // R: If they don't override privacy settings then...
      dataToSend_ = { // R: Alright, this is going to get messy but it'll check the privacy then add it if it's not set to block.
        username: lookupUser.username, // R: Public to all regardless.
        email: !lookupUser.privacySettings.hideEmail ? lookupUser.email : "[Hidden]",
        gender: !lookupUser.privacySettings.gender ? lookupUser.gender : "[Hidden]",
        firstName: !lookupUser.privacySettings.hideFirstName ? lookupUser.firstName : "[Hidden]",
        lastName: !lookupUser.privacySettings.hideLastName ? lookupUser.lastName : "[Hidden]",
        address: "[Hidden]", // R: Should always be hidden from users.
      }
    }

    return res.json(dataToSend_); // R: This will send the appropriate data.
});
// R: The last of these routes are the same but they set data.
user_router.post("/Info", auth.verifyToken, async(req, res) => {
  try{
    const user = await User.findById(req.user.userID);
    if (!user){
      return res.json({message: "Missing User!"});
    }

    Object.keys(req.body).forEach((key) => { // R: Get each variable inside req.body
      if (user[key] !== undefined && key !== "privacySettings" && key != "permissionLevel") { // R: Check if the user's var is in the Schema.
        user[key] = req.body[key]; // R: Update the user's var.
      }
      else if (key === "privacySettings"){ // R: Addition to avoid mistakes.
        Object.keys(user[key]).forEach((setting) => { // R: So, it will go through privacySettings and check if it is undefined, if it is then set it to what it's already at.
          user[key][setting] = req.body[key][setting] !== undefined ? req.body[key][setting] : user[key][setting];
        })
      }
    });
    await user.save(); // R: Save the user.
    return res.json({message: "Account Edited!"});
  }
  catch (err_){
    console.log(err_);
    return res.status(400).json({message: "An unexpected error has occured!"});
  }
});
user_router.post("/Info/:id", auth.verifyToken, async(req, res) => {
  try{ // R: Same thing but we check the user's permissionLevel and the user's permissionLevel.
    const user = await User.findById(req.user.userID);
    const target = await User.findById(req.params.id);
    if (!user){
      return res.json({message: "Missing User!"});
    }
    if (!target){
      return res.json({message: "Missing Target!"});
    }
    if (user.permissionLevel <= 2 || user.permissionLevel <= target.permissionLevel)
    {
      return res.json({message: "You can't change the information of this account. You don't have the proper authority."});
    }

    Object.keys(req.body).forEach((key) => { // R: Same thing as PUT /Info route.
      if (target[key] !== undefined && key !== "privacySettings" && key !== "permissionLevel") { // R: All except privacy settings, don't change that.
        target[key] = req.body[key];
      }
      else if (key === "permissionLevel"){
        if (req.body[key] >= user[key]) {
          target[key] = (user[key] - 1) < 0 ? 0 : user[key] - 1; // Make it one below their rank.
        }
        else {
          target[key] = req.body[key];
        }
      }
    });
    await target.save(); // R: Save the user.
    res.json({message: "Account Edited!"});
  }
  catch (err_){
    console.log(err_);
    return res.status(400).json({message: "An Unexpected Error has Occurred!"});
  }
});

// R: == CART ROUTERS ==
user_router.get("/Cart", auth.verifyToken, async(req, res) => {
  try{
    await User.findById(req.user.userID).then((user) => {
      res.json({cart: user.cart});
    })
  }
  catch (err_) {
    console.log(err_);
    res.status(400).json({message: "An Unexpected Error has Occurred!"});
  }
})

user_router.post("/Cart", auth.verifyToken, async(req, res) => {
  try{
    const {product, quantity} = req.body;
    const user = await User.findById(req.user.userID);
    
  }
  catch (err_){
    console.log(err_);
    return res.status(400).json({message: "An Unexpected Error Has Occured!"});
  }
});

user_router.delete("/Cart", auth.verifyToken, async(req, res) => {
  try{
    const {product, quantity} = req.body;
    const user = User.findById(req.user.userID);
  
    for (let x_ = 0; x_ < user.cart.length; x++) { // R: Loop through the cart.
      if (user.cart[x].product === product){ // R: if the product is the same key we're looking for...
        user.cart[x].quantity -= quantity; // R: Decrease by quantity.
        if (user.cart[x].quantity <= 0) { // R: If the quantity is too low...
          user.cart.splice(x, 1); // R: Remove it from the array.
        }
        break; // R: Stop the loop.
      }
    }
    await user.save(); // R: Save changes.
    return res.json(user.cart); // R: Return the cart.
  }
  catch (err_){
    console.log(err_);
    return res.status(400).json({message: "An unexpected error has occured."});
  }
});

export default user_router;