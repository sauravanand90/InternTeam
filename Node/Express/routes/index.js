//This will be used to store all item specific routes

const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', (req, res) => {
    res.send("Got a GET Request");
    // res.sendFile('../file.html',
    //     { root: __dirname });
})

router.post('/items', (req, res) => {
    // res.send("Got a POST Request");
    res.json({ x: 1, y: 2, z: 3 });
})

router.put('/items/:id', (req, res) => {
    res.send("Got a PUT Request");
})

router.delete('/items/:id', (req, res) => {
    res.send("Got a DELETE Request");
})

module.exports = router