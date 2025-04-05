import mongoose from "mongoose";

// == R ==
// -- Product Vars Todo List --
// 1. Email [Required] [Unique] (Example: "bob@bob.com") (Check if email is actually an email using a filter. [Talk to me if you forgot how to do that.])
// 2. Username [Required] [Unique] (Example: "BobsAccount")
// 3. First Name [Required] (Example: "Bob")
// 4. Last Name [Required] (Example: "Jenkins")
// -- The Address, Balance & Cart aren't set as required as we can set them up later rather than immediately.
// 5. Address 
// 6. Balance (Example: 2000) (How much balance the user has on the database.)
// 7. Cart (Example: {{"SKE-SHO-SNE-201043", 1}, {"NKE-SHO-SNE-591039", 2}}) 
// 8. Permissions [Required] (Example: ["manageUsers", "manageProducts"...])

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
        gender: {
            type: String,
            enum: ["Not Set", "Male", "Female", "Other"],
            default: "Not Set"
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        balance: {
            type: Number,
<<<<<<< HEAD
=======
            required: true,
        },
        cart: [{
            product: {type: String, required: true},
            quantity: {type: Number, required: true}
        }],
        privacySettings: {
            hideEmail: {type: Boolean, required: true, default: true},
            hideGender: {type: Boolean, required: true, default: true},
            hideFirstName: {type: Boolean, required: true, default: true},
            hideLastName: {type: Boolean, required: true, default: true},
            hideAddress: {type: Boolean, required: true, default: true},
        },
<<<<<<< HEAD
        permissions: {
            type: [String],
>>>>>>> 8f0a197 (Added Router Stuff (WIP))
            required: true,
        },
        cart: [{
            product: {type: String, required: true},
            quantity: {type: Number, required: true}
        }],
        privacySettings: {
            hideEmail: {type: Boolean, required: true, default: true},
            hideGender: {type: Boolean, required: true, default: true},
            hideFirstName: {type: Boolean, required: true, default: true},
            hideLastName: {type: Boolean, required: true, default: true},
            hideAddress: {type: Boolean, required: true, default: true},
        },
        permissionLevel: {
            // Permission Level: States what permission the user has. (This is basically how their labeled and what permission they have.)
            // 0 -> Basic User/Customer (Only allows own account info and basic shopping.)
            // 1 -> Employee (User + Should only be able to view customer's history.)
            // 2 -> Trusted Employee (Employee + Should be able to view customer details.)
            // 3 -> Manager (Manager + Should be able to add/remove items from the store.)
            type: Number, 
            required: true,
=======
        permissionLevel: {
            // Permission Level: States what permission the user has. (This is basically how their labeled and what permission they have.)
            // 0 -> Basic User/Customer (Only allows own account info and basic shopping.)
            // 1 -> Employee (User + Should only be able to view customer's history.)
            // 2 -> Trusted Employee (Employee + Should be able to view customer details.)
            // 3 -> Manager (Manager + Should be able to add/remove items from the store.)
            type: Number, 
            required: true,
>>>>>>> 4ce3e54 (Authorizational Changes and Getting/Setting Information on a User. (Currently, Cart is a WIP but it's almost done.))
            enum: [0, 1, 2, 3],
            default: 0
        },
    }
);

const User = mongoose.model("User", userSchema);
export default User;