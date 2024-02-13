const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Must provide title'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Must provide description']
    },
    content:{
        type:String,
        required:[true,'Must provide title']
    },
    writer:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    photo:{
        type:mongoose.Types.ObjectId,
        required:[true]
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('Blog',blogSchema)