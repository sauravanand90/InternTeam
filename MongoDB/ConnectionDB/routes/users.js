const express=require('express')
const router=express.Router();

const User=require('../models/userModel');

//routes

//CRUD operations

//view/read

router.get('/users',async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({
            success:false, 
            message:err.message
        })
    }
})

//Create

router.post('/users',async(req,res)=>{
    try{
        const{name,age,gender,weight}=req.body;
        const newUser=new User({name,age,gender,weight});
        await newUser.save();
        res.status(500).json({
            success:true,
            user:newUser
        })
    }
    catch(err){
        res.status(500).json({
            success:false, 
            message:err.message
        })
    }
})

//Update

router.put('/users/:id',async(req,res)=>{
    const {id}=req.params;
    const{name,age,gender,weight}=req.body;
    try{
      
        const updatedUser= await User.findByIdAndUpdate(id,{name,age,gender,weight})
        if(!updatedUser){
            res.json({
                message:"user not found"
            })
        }
        res.status(200).json({
            success:true,
            user:updatedUser
        })
    }
    catch(err){
        res.status(500).json({
            success:false, 
            message:err.message
        })
    }
})

//Delete

router.delete('/users/:id',async(req,res)=>{
    const {id}=req.params;
    try{
      
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            res.json({
                message:"user not found"
            })
        }
        res.status(200).json({
            success:true,
            user:deletedUser
        })
    }
    catch(err){
        res.status(500).json({
            success:false, 
            message:err.message
        })
    }
})


module.exports=router;