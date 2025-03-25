import mongoose from "mongoose";

// -- Product Vars Todo List --
// 1. Email [Required] [Unique] (Example: "bob@bob.com") (Check if email is actually an email using a filter. [Talk to me if you forgot how to do that.])
// 3. Username [Required] [Unique] (Example: "BobsAccount")
// 2. First Name [Required] (Example: "Bob")
// 3. Last Name [Required] (Example: "Jenkins")
// 4. Balance [Required] (Example: 2000) (How much balance the user has on the database.)
// 5. Cart [Required] (Example: {{"SKE-SHO-SNE-201043", 1}, {"NKE-SHO-SNE-591039", 2}}) 
// 6. Is Admin [Required] (Example: false) (Authorized to Make Changes.)

const userSchema = mongoose.Schema({

});
export default userSchema;