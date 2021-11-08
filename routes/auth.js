const auth = require('./../middleware/authentication')
const express = require('express')
const Router = express.Router()
const {signup,login,getUser,updateUser} = require('./../controllers/auth')

Router.route('/login').post(login)
Router.route('/signup').post(signup)
Router.route('/:username').get(getUser)
Router.route('/edit/:username').patch(auth,updateUser)

module.exports = Router