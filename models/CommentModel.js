import mongoose from "mongoose"

let Schema = new mongoose.Schema({ // Scheme how nodeJs will interact with MongoDB. In this part we define attributes of model
    userId: {type: String, require: true},
    lizardId: {type: String},
    username: {type: String},
    description: {type: String},
    userPicturePath: {type: String},
    picturePath: {type: String},
    likes: {type: Map, of: Boolean, default: {}},
}, {timestamps: true} // automatically adds 2 properties createdAt and updatedAt
);

const Comment = mongoose.model("Comments", Schema); // Created model using this schema
export default Comment;