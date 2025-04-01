// const express = require('express')
// const app = express()
// const port = 3000

// // //Different Requests

// // // GET request
// // app.get('/',(req,res)=>{
// //   //res.send("Got a GET Request")
// //   res.sendFile('./file.html',{root:__dirname}); //sending a file 
// // });

// // // POST request
// // app.post('/items',(req,res)=>{
// //     // res.send("Got a POST Request")
// //     res.json({x:1, y:2, z:3}); //Check in postman for JSON file
// // });

// // // PUT request
// // app.put('/items/:id',(req,res)=>{
// //   res.send("Got a PUT Request")
// // });

// // // DELETE request
// // app.delete('/items/:id',(req,res)=>{
// //   res.send("Got a DELETE Request")
// // });

// // -------------------------------------------------------------------------

// //Can be also done by chaining with requests
// // app.get('/',(req,res)=>{
// //   //res.send("Got a GET Request")
// //   res.sendFile('./file.html',{root:__dirname}); //sending a file 
// // }).post('/items',(req,res)=>{
// //     // res.send("Got a POST Request")
// //     res.json({x:1, y:2, z:3}); //Check in postman for JSON file
// // }).put('/items/:id',(req,res)=>{
// // res.send("Got a PUT Request")
// // });

// // -------------------------------------------------------------------------

// //For working with complex application, the best method is express router

// //Imported items router file
// const item = require('./routes/index');
// //Load into application
// app.use('/api', item);

// // -> /api/ -> item home page
// // -> /api/items -> item post request
// // -> /api/items/id -> item put/delete request

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// -------------------------------MIDDLEWARE-------------------------------------
const express = require('express')
const app = express()
const port = 3000

//Loading middleware into the app
//in-built middleware
app.use(express.json());     //used for parsing JSON

// //middleware -logging, authorization, validation
// //Look after the order of creation of middleware bcz it will execute in the same order it is created

// //Creation of middleware
// const loggingMiddleware = function(req,res,next){
//   console.log("Performing logging");
//   next();
// }
// //Loading of middleware into application
// app.use(loggingMiddleware);

// const authMiddleware = function(req,res,next){
//   console.log("Performing authorization");
//   next();
// }
// app.use(authMiddleware);

// const validationMiddleware = function(req,res,next){
//   console.log("Performing validation");
//   next();
// }
// app.use(validationMiddleware);

const route = require('./routes/route')
//mounting the routes
app.use('/api', route)


app.get('/', (req, res) => {
  console.log("This is route handler");
  console.log(req.body)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})