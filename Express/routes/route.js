const express = require('express')
const router = express.Router()

//middleware
const auth=function(req,res,next){
    console.log("Authentication middleware");
    req.user={userId:1, role:"student"};

    if(req.user){
        //if a valid user proceed to next
        next();
    }
    else{
        res.json({
            success:false,
            message:" Not a valid user",
        })
    }
}

const isStudent=function(req,res,next){
    console.log("Student middleware");

    if(req.user.role==="student"){
        next();
    }
    else{
        res.json({
            success:false,
            message:"Access denied, this route is for students only",
        })
    }
}

const isAdmin=function(req,res,next){
    console.log("Admin middleware");

    if(req.user.role==="admin"){
        next();
    }
    else{
        res.json({
            success:false,
            message:"Access denied, this route is for admin only",
        })
    }
}

//routes

router.get("/student",auth,isStudent,(req,res)=>{
    console.log("student route");
    res.send("Student page")
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    console.log("admin route");
    res.send("admin page")
})

module.exports = router