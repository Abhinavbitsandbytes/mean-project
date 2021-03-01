const express = require('express')

const app = express();

app.use('/api/posts',(req, res, next) => {
console.log('first middleware!')

const posts = [
    {
        id:'kkjkjk',
        title:'first-server-side post',
        contet:'this is coming from the server'
    },
    {
        id:'ihuh',
        title:'second-server-side post',
        contet:'this is coming from the server!'
    }
]

res.status(200).send({
    message: 'posts fetched successfully',
    posts:posts
})
});



module.exports=app;