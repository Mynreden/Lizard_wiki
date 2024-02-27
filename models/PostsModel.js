import mongoose from "mongoose"

let Schema = new mongoose.Schema({ // Scheme how nodeJs will interact with MongoDB. In this part we define attributes of model
    text: {type: String},
    topic_id: {type: String},
    author_id: {type: String},
    image_url: {type: String, default: null},
}, {timestamps: true} // automatically adds 2 properties createdAt and updatedAt
);

const Post = mongoose.model("Posts", Schema); // Created model using this schema
export default Post;