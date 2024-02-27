import {genSalt, hash, compare} from "bcrypt" // for encrypting 
import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"


export const register = async (req, res, cb) => {
    try {
        console.log(req)
        let {
            username,
            email,
            password,
            location} = req.body // getting attributes from request
        const salt = await genSalt(10);
        const passwordEncrypted = await hash(password, salt); // encrypt password for security
        if (!req.file){
            req.file = {filename: "default.png"}
        }
        if (!email){
            email = ""
        }
        if (!location){
            location = ""
        }
        const newUser = new User({ // creting User object
            username,
            email,
            password: passwordEncrypted,
            picturePath: req.file.filename,
            location,
        })
        const savedUser = await newUser.save(); // save it to database 
        const token = jwt.sign({id: savedUser._id }, process.env.JWT_SECRET_KEY) // creating token for security
        delete savedUser.password // deleting passwort attribute from object
        res.status(200).json({token, user: savedUser}) // send to client token and user info
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
}

export const login = async (req, res, cb) => {
    try {
        const {username,
            password} = req.body // getting attributes from request
            console.log(req.body)
        const currentUser = await User.findOne({username})
        if (!currentUser) {
            return res.status(400).json({error: "User with this username doesn`t exist"})
        }
        const isPasswordCorrect = await compare(password, currentUser.password); // check is password correct
        if (!isPasswordCorrect) {
            return res.status(400).json({error: "Password is incorrect"})
        }
        const token = jwt.sign({id: currentUser._id }, process.env.JWT_SECRET_KEY) // creating token for security
        delete currentUser.password // deleting passwort attribute from object
        res.status(200).json({token, user: currentUser}) // send to client token and user info
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
}