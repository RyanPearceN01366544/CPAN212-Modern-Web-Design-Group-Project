import mongoose from "mongoose";

// == R ==
// -- Product Vars Todo List --
// 1. Email [Required] [Unique] (Example: "bob@bob.com") (Check if email is actually an email using a filter. [Talk to me if you forgot how to do that.])
// 3. Username [Required] [Unique] (Example: "BobsAccount")
// 2. First Name [Required] (Example: "Bob")
// 3. Last Name [Required] (Example: "Jenkins")
// -- The Address, Balance & Cart aren't set as required as we can set them up later rather than immediately.
// 4. Address 
// 4. Balance (Example: 2000) (How much balance the user has on the database.)
// 5. Cart (Example: {{"SKE-SHO-SNE-201043", 1}, {"NKE-SHO-SNE-591039", 2}}) 
// 6. Permissions [Required] (Example: ["manageUsers", "manageProducts"...])

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // R: -> Makes it check for email format. ^\s@ being a string input and '+@' being the @. Meaning it has to match: *@*.*
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        permissions: {
            type: [String],
            required: true,
            enum: [], // R: Start with no permissions.
        },
    }
);

const User = mongoose.model("User", userSchema);
export default User;