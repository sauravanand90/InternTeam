const express = require("express");
const router = express.Router();   //Used to define the routes separately
const { register, login } = require("../controllers/authController"); 
const protect = require('../middleware/authMiddleware')     //Imports middleware to protect certain routes
                                                            //protect is used to check if the user is authenticated

//Protected route
router.get('/dashboard', protect, (req, res) => {    //Defines a protected route that can only be accessed 
    res.send('This is a protected dashboard');       //if the protect middleware allows it
})

router.post("/register", register);    //Handles registration(calls register controller function to create a new user)
router.post("/login", login);          //Handles login(calls login controller function to authenticate a user and return a token)

module.exports = router;v 