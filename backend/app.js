const express = require('express')
const bodyParser = require("body-parser")
const Post = require('./models/post')
const mongoose = require('mongoose')

const app = express();

mongoose.connect("mongodb+srv://abhinav-kumar_97:M22hyCjhsDXZ4l8M@cluster0.rayrd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to database!")
})
.catch((error)=>{
    console.log('Connection failed!', error)
})
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")

next();
})

app.post("/api/posts", (req,res,next)=>{
    const post = new Post({
        title:req.body.title,
        content:require.body.content
    });
    console.log(post)
    res.status(201).json({
        message:'Post added successfully!'
    })

})

app.get('/api/posts',(req, res, next) => {
console.log('first middleware!')

const posts = [
    {
        id:'kkjkjk',
        title:'first-server-side post',
        content:'this is coming from the server'
    },
    {
        id:'ihuh',
        title:'second-server-side post',
        content:'this is coming from the server!'
    }
]

res.status(200).send({
    message: 'posts fetched successfully',
    posts:posts
})
});



module.exports=app;