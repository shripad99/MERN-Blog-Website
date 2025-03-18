require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const multer = require('multer');
const path = require('path');

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.use("/images", express.static(path.join(__dirname, "/images")))

const authRoute = require("./routes/auth")
const authUser = require("./routes/user")
const authPost = require("./routes/post")
const authCategory = require("./routes/categories")

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected');
    }
)

const storage = multer.diskStorage({
    destination : (req,file,callb) =>{
        callb(null, "images")
    },
    filename: (req, file, callb) =>{
        callb(null, req.body.name)
    }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single("file"),(req, res) =>{
    res.status(200).json("File has been uploaded")
})

app.use('/auth', authRoute);
app.use('/users', authUser);
app.use('/posts', authPost); 
app.use('/category', authCategory); 

app.listen(PORT);
console.log('Listening on port 3000');