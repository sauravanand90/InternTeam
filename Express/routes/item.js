const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
     res.send("GET Request")
    //res.sendFile('../dummy.html',{root:__dirname}); //sending a file 
  });
  
  router.post('/items',(req,res)=>{
      // res.send("POST Request")
      res.json({x:1,y:2,z:3}); //can be seen in postman as json file 
  });
  
  router.put('/items/:id',(req,res)=>{
    res.send("PUT Request")
  });
  
  router.delete('/items/:id',(req,res)=>{
    res.send("DELETE Request")
  });

module.exports = router