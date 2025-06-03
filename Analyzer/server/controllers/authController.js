// const User = require('../models/User');
// const bcrypt = require('bcryptjs');   //Used for hashing the passwords for security purpose
// const jwt = require('jsonwebtoken');  //Used for token generation to identify user's identity

// exports.register = async (req, res) => {
//   const { email, password } = req.body;    //gets email and password from req.body
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);  //hashes the password
//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;    //gets login credentials
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });  //creates a token
//     res.json({ token });   //sends back the token if login is successful
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email format
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Example: At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters and include uppercase, lowercase, and a number',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters and include uppercase, lowercase, and a number',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
