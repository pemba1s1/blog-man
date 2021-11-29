const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    authorId:{
        type : mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment:{
        type : String,
        required :[true,"Comment Is Required"]
    },
    blogId:{
        type : mongoose.Types.ObjectId,
        ref: 'Blog',
        required: true
    }

})

module.exports = mongoose.model('Comment',commentSchema)