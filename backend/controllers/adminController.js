const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const adminLogin = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;
    const admin= await User.findOne({email,isAdmin:true})
    if(admin&&(await bcrypt.compare(password,admin.password))){
        res.json({
            _id : admin._id,
            name:admin.name,
            email:admin.email,
            token : generateToken(admin._id)
        })
    }
})

const adminDashboard = asyncHandler(async (req,res)=>{
    const userData = await User.find({isAdmin:false});
    res.status(200).json(userData);
})

const removeUser = asyncHandler(async (req,res)=>{
    const {id}=req.params;
    console.log(req.params);
    const user = await User.findOne({_id:id})
    if(!user.name){
        res.status(400)
        throw new Error('User not Found')
    }
    await user.remove()
    res.status(200).json({message:'Deleted succefully'})
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports={
    adminLogin,
    adminDashboard,
    removeUser
}