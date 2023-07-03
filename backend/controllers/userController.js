const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  console.log('hai');
  res.status(200).json(req.user)
})


const updateUser = asyncHandler(async (req,res)=>{
  console.log(req.body.image+"enth alle");
  const user = await User.findById({_id:req.user.id});
  console.log("haideer"+req.user);

  if(!user.name){
      res.status(400)
      throw new Error('User not Found')
  }
  console.log(req.body.image);
  const name = req.body.name ? req.body.name:user.name;
  const email = req.body.email ? req.body.email:user.email;
  const image = req.body.image ? req.body.image:user.image;
  const password = user.password
  
  const newUser = {
      name :  name ,
      email : email,
      image: image,
      password : password
    }
  const updatedUser =await User.findByIdAndUpdate(req.user._id, newUser, {
      new : true
  })
  res.status(200).json(updatedUser)
})




// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateUser
}
