const Blog = require('./../models/blog')
const User = require('../models/user')
const asyncWrapper = require('./../middleware/asyncWrapper')

const getAllBlogs = asyncWrapper(async (req,res)=>{
    const blogs = await Blog.find({}).populate('writer','-password').sort({createdAt:-1}).exec((err,blogs)=>{
        if(err){
            return res.status(404).json({msg: `No blog with id : ${blogID}`})
        }else{
            return res.status(200).json({blogs})
        }
    })
})

const createBlog = asyncWrapper(async (req,res)=>{
    const blog = await Blog.create(req.body)
    res.status(201).json(req.body)
})

const getBlog = asyncWrapper(async (req,res)=>{
    const {id:blogID} = req.params
    const blog = await Blog.findOne({_id:blogID}).populate('writer','-password').exec((err,blog)=>{
        if(err){
            return res.status(404).json({msg: `No blog with id : ${blogID}`})
        }else{
            return res.status(200).json({blog})
        }
    })
})

const deleteBlog = asyncWrapper(async (req,res)=>{
    const {id:blogID} = req.params
    const blog = await Blog.findOneAndDelete({_id:blogID,writer:req.user.userId})
    if(!blog){
        return res.status(404).json({msg: `No blog with id : ${blogID} or you are not authorized to delete`})
    }
    res.status(200).json({blog})
})

const updateBlog = asyncWrapper(async (req,res)=>{
    const {id:blogID} = req.params
    const blog = await Blog.findOneAndUpdate({_id:blogID,writer:req.user.userId},req.body,{
        new:true,
        runValidators:true,
    })
    if(!blog){
        return res.status(404).json({msg: `No blog with id : ${blogID} or you are not authorized to edit`})
    }
    res.status(200).json({blog})
})

const userBlog = asyncWrapper(async (req,res)=>{
    const {username} = req.params
    const user = await User.findOne({username:username}).select('-password')
    if(!user){
        return res.status(404).json({msg: `User not found`})
    }else{
        Blog.find({writer:user._id})
        .sort({createdAt:-1})
        .exec(function (err, userBlogs) {
            if (err) return handleError(err);
            return res.status(200).json({userBlogs,user})
          });
    }
})

module.exports = {
    getAllBlogs,
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog,
    userBlog
}