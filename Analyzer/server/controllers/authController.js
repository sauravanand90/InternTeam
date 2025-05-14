const User = require('../models/User');
const bcrypt = require('bcryptjs');   //Used for hashing the passwords for security purpose
const jwt = require('jsonwebtoken');  //Used for token generation to identify user's identity

exports.register = async (req, res) => {
  const { email, password } = req.body;    //gets email and password from req.body
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);  //hashes the password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;    //gets login credentials
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });  //creates a token
    res.json({ token });   //sends back the token if login is successful
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};