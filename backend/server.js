const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer')
const port = process.env.port;
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments');
//database connection 
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('database connected successfully')
    } catch (error) {
        console.log(error)
    }
}
//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use('/images', express.static('./images'));
//routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment',commentRouter)

//test
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})
const upload=multer({storage:storage})
app.post('/fileUpload', upload.single("file"),(req, res) => {
 res.status(200).json("Image has been uploaded successfully!")
})




app.listen(port, (req, res) => {
    dbConnection();
    console.log(`Server is running on the port ${port}`)

})