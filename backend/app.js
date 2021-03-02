const express = require('express')
const bodyParser = require("body-parser")
const Post = require('./models/post')
const mongoose = require('mongoose')

const app = express();

mongoose.connect("mongodb+srv://abhinav-kumar_97:M22hyCjhsDXZ4l8M@cluster0.rayrd.mongodb.net/node-angular?retryWrites=true&w=majority")
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
        content:req.body.content
    });
    console.log(post)
    post.save()
    res.status(201).json({
        message:'Post added successfully!'
    })

})

app.get('/api/posts',(req, res, next) => {
console.log('first middleware!')

Post.find().then((documents)=>{
    res.status(200).send({
        message: 'posts fetched successfully',
        posts:documents
    })
})


});



module.exports=app;