const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const path = require('path')

const postRoutes = require("./routes/posts")
const app = express();

mongoose.connect("mongodb+srv://abhinav-kumar_97:Q3M6cW3teRvYnbhi@cluster0.rayrd.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to database!")
})
.catch((error)=>{
    console.log('Connection failed!', error)
})
app.use(bodyParser.json())
app.use("/images", express.static("backend/images"))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")

next();
})

app.use("/api/posts",postRoutes)



module.exports=app;