const auth = require('./../middleware/authentication')
const express = require('express')
const router = express.Router()
const {
    getAllBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    userBlog
} = require('./../controllers/blog')

router.route('/').get(getAllBlogs).post(auth,createBlog)
router.route('/:id').get(getBlog).delete(auth,deleteBlog).patch(auth,updateBlog)
router.route('/user/:username').get(userBlog)

module.exports = router