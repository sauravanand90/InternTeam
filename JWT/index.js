const express = require('express')
const app = express()
const port = 3000

require("dotenv").config();
const jwt=require('jsonwebtoken');

app.use(express.json());

app.post('/login',(req,res)=>{
    console.log("Login router");
    const {username,password}=req.body;
    if(username==="admin" && password==="admin"){
        const token=jwt.sign({username},
            process.env.JWT_SECRET_KEY,{
                expiresIn: 86400
            });
        return res.json({ 
            username, 
            token, 
            message: "Login successful"

        });
    }
    return res.json({
        message: "Invalid credentials"
    })
});

//middleware to verify the token 

const verifyTokenMiddleware = (req, res, next) => { 
    const { token } = req.body; 
    if (!token) return res.status(403).json({  
        msg: "No token present" 
    }); 
    try { 
        const decoded = jwt.verify(token,  
            process.env.JWT_SECRET_KEY); 
        req.user = decoded; 
    } catch (err) { 
        return res.status(401).json({  
            msg: "Invalid Token" 
        }); 
    } 
    next(); 
}; 

app.get("/home", verifyTokenMiddleware, (req, res) => { 
    const { user } = req; 
    res.json({ msg: `Welcome ${user.username}` }); 
});

app.listen(port, () => {
     console.log(`JWT app listening on port ${port}!`)
})


//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzQzNDg2ODYwLCJleHAiOjE3NDM1NzMyNjB9.4NLdC9DX-tidK-GkjH9W027tbU_YWTvO-VJx8nbeFmI"
// this the token that she be sent via the get request inorder to match the credentials 