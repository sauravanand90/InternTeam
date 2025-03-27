const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Requests

//get request
// app.get('/',(req,res)=>{
//   // res.send("GET Request")
//   res.sendFile('./dummy.html',{root:__dirname}); //sending a file 
// });

// app.post('/items',(req,res)=>{
//     // res.send("POST Request")
//     res.json({x:1,y:2,z:3}); //can be seen in postman as json file 
// });

// app.put('/items/:id',(req,res)=>{
//   res.send("PUT Request")
// });

// app.delete('/items/:id',(req,res)=>{
//   res.send("DELETE Request")
// });

//can be done with chaining also 
/*
app.put('/items/:id',(req,res)=>{
  res.send("PUT Request")
}).delete('/items/:id',(req,res)=>{
  res.send("DELETE Request")
});
end of one request lead to the begining of another request
*/


//need to load the router here 

// const item = require('./routes/item')
// app.use('/api',item);

// const bird = require('./routes/birds')
// app.use('/filler',bird)



// //creation of the middleware
// const loggingMiddleware=function(req,res,next){
//   console.log("Logging");
//   next();
// };
// app.use(loggingMiddleware);//leading middleware into the application

// const authMiddleware=function(req,res,next){
//   console.log("authenticating");
//   next();
// };
// app.use(authMiddleware);

// const validatingMiddleware=function(req,res,next){
//   console.log("validating");
//   next();
// };
// app.use(validatingMiddleware);

// //these should always be initialised first and then the app.get method at the end basically before route handlers



// // for middleware--> inbuilt middleware

// app.use(express.json()) //loading the middleware into the app-- inbuilt middleware

// app.get('/',(req,res)=>{
//   console.log("route handler")
//   console.log(req.body);
//   res.send('hello world!!')
// })


const route=require("./routes/route")
app.use('/api',route)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
