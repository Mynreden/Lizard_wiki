import User from "../models/UserModel.js";
import {genSalt, hash, compare} from "bcrypt" // for encrypting 

export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        delete user.password;
        delete user.isAdmin;
        res.status(200).json({user});
    }
    catch (err){
        res.status(500).json({error: err.message})
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const {id} = req.params;
        const users = await User.find();
        users.map((user) => {return {firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picturePath: user.picturePath,
        location: user.location}});
        console.log(users);
        res.status(200).json(users);
    }
    catch (err){
        res.status(500).json({error: err.message})
    }
}

export const changeUser = async (req, res) => {
    try {
        const {id} = req.params;
        const reqSenderUser = await User.findById(req.user.id);
        if (!reqSenderUser.isAdmin){
            if (req.user.id !== id){
                return res.status(500).json({error: "You can not change another users"})
            }
        }
        const {username,
            email,
            password,
            location} = req.body;
        const user = await User.findById(id);
        if (username != ""){
            user.username = username;
        }
        if (email != ""){
            user.email = email;
        }
        if (password != ""){
            user.password = password;
        }
        if (location != ""){
            user.location = location;
        }
        if (req.file){
            user.picturePath = req.file.filename;
            // delete old avatar 
        }
        const savedUser = await user.save();
        res.status(200).json({user: savedUser})
    }
    catch (err){
        res.status(500).json({error: err.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const {userId, password, username} = req.body;
        const user = await User.findById(userId);
        if (password != ""){
            const salt = await genSalt(10);
            const passwordEncrypted = await hash(password, salt); // encrypt password for security
            user.password = passwordEncrypted;
        } 
        if (username != ""){
            user.username = username;
        } 
        const newUser = await user.save();
        res.status(200).json({user: newUser})
    }
    catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}


export const userToAdmin = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);
        user.isAdmin = !user.isAdmin;
        const newUser = await user.save();
        console.log(newUser)
        res.status(200).json({user: newUser})
    }
    catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

export const deleteUser = async (req, res) => {
    try{
        const userId = req.params.userId;
        console.log(userId)
        await User.findByIdAndDelete(userId);

        res.status(200).json({message: "User deleted"})
    } catch (err){
        console.log(err);
        res.status(500).json({error: err.message})

    }
}