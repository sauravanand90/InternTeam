const express = require('express')
const router = express.Router()

//middlewares
const auth = function(req, res, next){
    console.log("I am inside authentication middleware");
    //dummy user
    req.user = {userId:1, role:"student"};

    if(req.user){
        //if valid user then proceed to next middleware
        next();
    }else{
        //if not a valid user
        res.json({
            success:false,
            message: "Not a valid user",
        }
        )
    }
}

const isStudent = function(req, res, next){
    console.log("I am inside student middleware");

    if(req.user.role === "student"){
        next();
    }else{
        res.json({
            success: false,
            message: "Access denied, this route is only for students"
        })
    }
}

const isAdmin = function(req, res, next){
    console.log("I am inside admin middleware");

    if(req.user.role === "admin"){
        next();
    }else{
        res.json({
            success: false,
            message: "Access denied, this route is only for admins"
        })
    }
}

//routes
router.get("/student", auth, isStudent, (req,res) => {
    console.log("I am inside student route");
    res.send("Students specific page");
})

router.get("/admin", auth, isAdmin, (req,res) => {
    console.log("I am inside admin route");
    res.send("Admins specific page");
})

module.exports = router