const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,"Username must be provided"]
    },
    name:{
        type:String,
        required:[true,"Name must be provided"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, 'invalid email'],
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:mongoose.Types.ObjectId,
        default:"6187fbd8b0f580a0eb97a71d"
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog"
    }]
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function(){
    return jwt.sign(
        {userId:this._id,username:this.username},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFELINE,
        }
    )
}

userSchema.methods.comparePassword = async function (canditatePassword){
    const isMatch = await bcrypt.compare(canditatePassword,this.password)
    return isMatch
}

module.exports = mongoose.model("User",userSchema)