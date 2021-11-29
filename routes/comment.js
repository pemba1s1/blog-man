const auth = require('../middleware/authentication')
const {writeComment,viewComment,editComment,deleteComment} = require('../controllers/comment')
const express = require('express')
const router = express.Router()

router.route('/').post(auth,writeComment)
router.route('/:id').delete(auth,deleteComment).patch(auth,editComment).get(viewComment)

module.exports = router