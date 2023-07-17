const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400) 
        throw new Error("All Fields are Mandatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User Already register")
    }
    //Hash password
    const hashedPassword = await bycrypt.hash(password, 10);
    // console.log("Hashed Password",hashedPassword)
    const user = await User.create(
        {
        username, 
        email, 
        password:hashedPassword
    }
    )
    console.log(`user create ${user}`)
    if(user){
        res.status(201).json({_id:user.id, email:user.email})
    }else{
        res.status(400)
        throw new Error("User Data Not Valid")
    }
    res.json({message:"Register The User"})
})


const loginUser = asyncHandler(async (req, res)=>{
    const {email, password}  = req.body;
    if(!email||!password){
        res.status(400)
        throw new console.Error("All fields are Mandatory");
    }
    const user = await User.findOne({email})
    //Compare password with hash password
    if(user && (await bycrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn:"15m"})
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Email or Password is not correct")
    }
})

const currentUser = asyncHandler(async (req, res)=>{
    res.json(req.user)
    res.json({message:"Current User information"})
})



module.exports = {registerUser, loginUser, currentUser}