const jwt = require('jsonwebtoken');   //Handles JWT creation
const bcrypt = require('bcryptjs');    //Encrypts and verifies passwords
const {JWT_SECRET, TOKEN_EXPIRES_IN} = require('../config/config');  //Get values from config.js
const {addUser, getUser} = require('../models/userModel');   //Gets user handling function

//Register user
const register = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    addUser({id: Date.now(), username, password: hashedPassword});
    res.json({
        message: 'User registered successfully'
    });
};

//Login user
const login = async (req, res) => {
    const {username, password} = req.body;
    const user = getUser(username);
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }
    const token = jwt.sign({id: user.id, username}, JWT_SECRET, {expiresIn: TOKEN_EXPIRES_IN});
    res.json({
        message:'Login successful', token
    });
};

//JWT Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(403).json({
        message: 'No token provided'
    });
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch (err){
        res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

module.exports = { register, login, authMiddleware };