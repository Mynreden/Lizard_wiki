import mongoose from "mongoose"

let userSchema = new mongoose.Schema({ // Scheme how nodeJs will interact with MongoDB. In this part we define attributes of model
    username: {type: String, unique: true, require: true},
    email: {type: String, maxLength: 100, unique: true, require: true},
    password: {type: String, minLength: 2, require: true},
    picturePath: {type: String, default: "default.png"},
    location: String,
    isAdmin: {type: Boolean, default: false},
}, {timestamps: true} // automatically adds 2 properties createdAt and updatedAt
);

const User = mongoose.model("Users", userSchema); // Created model using this schema
export default User;
