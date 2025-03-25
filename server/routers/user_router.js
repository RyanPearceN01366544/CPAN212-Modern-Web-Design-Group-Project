import express from "express";

const user_router = express.Router();

user_router.get("/", (req, res) => {
    res.status(404).send("User not specified.");
});

// TODO: 
// Register -> Registers a user.
// Login -> Login the user with a token.
// GetCart -> Get the cart.

export default user_router;