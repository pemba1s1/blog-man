const Comment = require('../models/comment')
const User = require('../models/user')
const asyncWrapper = require('./../middleware/asyncWrapper')
const { StatusCodes } = require('http-status-codes')

const writeComment = asyncWrapper(async (req,res) => {
    const comment = await Comment.create({
        comment:req.body.comment,
        blogId:req.body.blogId,
        authorId:req.user.userId
    })
    res.status(StatusCodes.CREATED).json(comment)
})

const editComment = asyncWrapper(async(req,res) => {
    const {id:commentId} = req.params
    const comment = await Comment.findOneAndUpdate({_id:commentId,authorId:req.user.userId},req.body,{
        new:true,
        runValidators:true,
    })
    if(!comment){
        return res.status(StatusCodes.NOT_FOUND).json({msg:"failed to edit comment"})
    }else{
        return res.status(StatusCodes.OK).json(comment)
    }
    
})

const viewComment = asyncWrapper(async (req,res) => {
    const {id:blogId} = req.params
    const comment = await Comment.find({blogId:blogId}).populate('authorId','-password').sort({createdAt:-1})
    if(!comment){
        return res.status(StatusCodes.NO_CONTENT).json({msg:"Comments not found"})
    }else{
        return res.status(StatusCodes.OK).json(comment)
    }
    
})

const deleteComment = asyncWrapper(async (req,res) => {
    const {id:commentId} = req.params
    const com = await Comment.findOne({_id:commentId})
    if(req.user.userId!=com.authorId._id){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"You dont have authority to edit"})
    }
    const comment = await Comment.findOneAndDelete({_id:commentId})
    if(comment){
        return res.status(StatusCodes.OK).json({msg:"deleted"})
    }else{
        return res.status(StatusCodes.NOT_FOUND).json({msg:"Couldnt delete"})
    }
})

module.exports = {writeComment,editComment,viewComment,deleteComment}