const express = require('express')

const app = express();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
;
next();
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
})

app.use('/api/posts',(req, res, next) => {
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