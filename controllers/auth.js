const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const signup = async (req,res) => {
    const user = await User.create({...req.body}).catch(err=>{
        res.status(StatusCodes.BAD_REQUEST).json({msg:"Username or email already taken"})
        return
    })
    const token = user.createJWT()
    res.status(201).json({user : { username: user.username, name:user.name},token})
}

const login = async (req,res) => {
    const {username,password} = req.body
    if(!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json({msg:"Bad Request"})
        return
    }
    const user = await User.findOne({username})
    if(!user){
        res.status(StatusCodes.UNAUTHORIZED).json({msg:"User doesnt exist"})
        return
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        res.status(StatusCodes.UNAUTHORIZED).json({msg:"Password Incorrect"})
        return
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user : { username:user.username , name:user.name,userId:user._id,avatar:user.avatar } , token})
}

const getUser = async (req,res) => {
    const {username} = req.params
    const user = await User.findOne({username})
    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({msg:"User doesnt exist"})
        return
    }
    res.status(StatusCodes.OK).json({user : { username:user.username , name:user.name,userId:user._id,email:user.email,avatar:user.avatar }})
}

const updateUser = async (req,res) => {
    const {username} = req.params
    const user = await User.findOneAndUpdate({username:username,_id:req.user.userId},req.body,{
        new:true,
        runValidators:true,
    }).catch(err=>{
        res.status(StatusCodes.BAD_REQUEST).json({msg:"Username or email already taken"})
        return
    })
    if(!user){
        return res.status(404).json({msg: `User not found`})
        return
    }
    res.status(200).json({user})
}

module.exports = {signup,login,getUser,updateUser}