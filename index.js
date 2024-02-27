import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import path from "path"
import mongoose from "mongoose"
import dotenv from "dotenv"
import frontendRoutes from "./routes/frontend.js"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import commentRouter from './routes/comment.js'
import lizardRouter from './routes/lizard.js'

// import socketIO from "socket.io"
import http from "http"

//Some code to get variables from .env file
dotenv.config()

// Debug mode
const useLocalDB = true


// Some constants
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app);
// const io = socketIO(server);
const staticDir = path.join(process.cwd(), 'public')
const mongoUrl = useLocalDB ? process.env.MONGO_LOCAL_URL : process.env.MONGO_URL
const serverSelectionTimeoutMS = 1000 // Time in milliseconds twat server will wait to connect to db

// CORS allowed urls
// const whitelist = ['http://localhost:3000', undefined] // urls that can use API(I don know what to do with undefined)
// const cors_config = {
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) != -1){
//             return callback(null, true)
//         }
//         else{
//             return callback(new Error(`${origin}`))
//         }
//     }
// }


// app.use(
//     helmet({
//       contentSecurityPolicy: false,
//       xDownloadOptions: false,
//     })
// );
app.use(morgan("common")) // For logging requests
// app.use(cors(cors_config)) // For getting access to API from another domains
app.use(express.json()) // For parsing application/json requests
app.use(bodyParser.urlencoded({extended: true})) // For parsing application/x-www-form-urlencoded requests
app.use('/public', express.static(staticDir)); // We can get elements such as media by url. 
                                               //Example: https://localhost:3001/static/photo/id.png

// EJS module                                         
app.set("view engine", "ejs");
app.set('views',path.join(process.cwd(), 'views'));

// Routes
// app.use('/lizards', lizardRouter)
// app.use('/admin', lizardRouter)

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)
app.use('/lizards', lizardRouter)

// Frontend
app.use('/', frontendRoutes)

                                        
// MongoDB connection
let db = mongoose.Mongoose;
try {
    db = await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS });
} catch (err) {
    console.error(err)
    mongoose.disconnect()
    process.abort()
} 

mongoose.connection.on('connected', () => { // send message after connection
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});


server.listen(port, () =>{
    console.log(`Listening in http://localhost:${port}`);
})