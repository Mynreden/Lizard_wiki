import dotenv from "dotenv"
import { faker } from '@faker-js/faker';
import {genSalt, hash, compare} from "bcrypt" // for encrypting 
import User from "./models/UserModel.js";
import Post from "./models/PostModel.js";
import chatModel from "./models/ChatModel.js";
import Message from "./models/MessageModel.js";
import mongoose from "mongoose"

dotenv.config()
// MongoDB connection
const mongoUrl = process.env.MONGO_LOCAL_URL
const serverSelectionTimeoutMS = 1000 // Time in milliseconds twat server will wait to connect to db


let db = mongoose.Mongoose;
try {
    db = await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS });
} catch (err) {
    console.error(err)
    mongoose.disconnect()
    process.abort()
} 


export const register = async (data) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation} = data // getting attributes from request
        const salt = await genSalt(10);
        const passwordEncrypted = await hash(password, salt); // encrypt password for security

        const newUser = new User({ // creting User object
            firstName,
            lastName,
            email,
            password: passwordEncrypted,
            picturePath: "default.png",
            friends,
            location,
            occupation,
            viewedProfile: undefined,
            impressions: undefined
        })
        const savedUser = await newUser.save(); // save it to database 
        
    }
    catch (err) {
        console.log({message: err.message})
    }
}

// for (let i =0; i < 20; i ++){
//     const data = {
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         email: faker.internet.email(),
//         password: "Sultan2004",
//         location: {city: faker.location.city(), country: faker.location.country()},
//         occupation: faker.person.jobTitle()} 
//     register(data);
// }


export const createPost = async (data) => {
    try {
        const { userId,
            description,
            picturePath } = data;
        const currentUser = await User.findById(userId);   
        const newPost = new Post({
            userId,
            description,
            picturePath,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            location: currentUser.location,
            userPicturePath: currentUser.picturePath,
            likes: {},
            comments: []
        })
        const savedUser = await newPost.save();  }
    catch (err) {
        return console.log({err: err.message})
    } 
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// const users = await User.find();
// users.forEach((user) => {
//     const n = randomIntFromInterval(1, 10)
//     for ( let i = 0; i < n; i++){
//         const body = { userId: user._id,
//             description: faker.lorem.words(7)}
//         createPost(body)
//     }
// } )

export const createChat = async (data) => {
    const { firstId, secondId } = data;
    try {
      const chat = await chatModel.findOne({
        members: { $all: [firstId, secondId] },
      });
  
      if (chat) return res.status(200).json(chat);  // check if chat already exist
  
      const newChat = new chatModel({
        members: [firstId, secondId],
      });
  
      const response = await newChat.save();
    } catch (error) {
      console.log(error);
    }
  };

  
// const users = await User.find();
// const len = users.length
// for (let i = 0; i < len; i++){
//     for (let j = i + 1; j < len; j++ ){
//         const flag = Boolean(randomIntFromInterval(0, 2));
//         if (flag){
//             createChat({ firstId: users[i]._id, secondId: users[j]._id })
//         }
//     }
// }

export const createMessage = async (data) => {
    const { chatId, senderId, text } = data;
  
    const message = new Message({
      chatId,
      senderId,
      text,
      status: "unread"
    });
  
    try {
      const response = await message.save();
    } catch (error) {
      console.log(error);
    }
  };
  

const chats = await chatModel.find();
chats.forEach((chat) => {
    const n = randomIntFromInterval(20, 100);
    for (let i = 0; i < n; i++){
        createMessage({ chatId: chat._id, 
            senderId: randomIntFromInterval(0, 1) == 0 ? chat.members[0] : chat.members[1], 
            text: faker.lorem.words(randomIntFromInterval(5, 10))})
    }
})

