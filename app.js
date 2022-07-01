const express=require('express')
const app=express()
const cors=require("cors")
const bodypraser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session')
const addcomment=require('./api/routes/addComment')
const postsroute=require('./api/routes/addPost')
const userRoute=require('./api/routes/adduser')
const nestRoute=require('./api/routes/nestComment')

app.use(cors())
mongoose.connect('mongodb+srv://Mahmood:Rfosm%40259@forumapp.agkymsk.mongodb.net/forumapp?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true });
var db=mongoose.connection;

db.on('error',console.error.bind(console,'MongoDB connection error:'))
db.on('open',()=>{console.log('MongoDB connection created:')})
console.log('databases created');

app.use(bodypraser.urlencoded({extended:false}));
app.use(bodypraser.json());     
app.use(session({
    secret:'secret-key',
    resave: true,
    saveUninitialized: true,
      
}));


app.use((req, res, next) => {
   // res.header("Content-Security-Policy: default-src *; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com");           
    //res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET,PATCH");
        return res.status(200).json({});
    }
    next();
})

app.use('/comment',addcomment);
app.use('/post',postsroute);
app.use('/user',userRoute);
app.use('/nest',nestRoute)

app.use((req, res, next) => {
    console.log(next)
    const error = new Error("requesting API not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({
            error: {
                message: error.message
            }
        })
});

module.exports=app