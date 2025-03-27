const express=require('express');
const app=express();
const connectDB = require('./db');
const users=require('./routes/users')

const PORT=3000;

//body parser
app.use(express.json());

//connect to database
connectDB();

app.use('/api',users);

app.get('/',(req,res)=>{

    console.log("route handler");
    res.send("Hello!");
})

app.listen(PORT,()=>{
    console.log("Server is UP");
})
