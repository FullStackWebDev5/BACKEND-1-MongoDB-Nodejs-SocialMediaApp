const express = require('express')
const userCntrl = require('./user.controller')
const { isLoggedIn } = require('../../middlewares/user')

const router = express.Router()

router.post('/signup', userCntrl.signupUser)
router.post('/login', userCntrl.loginUser)
router.get('/posts', isLoggedIn, userCntrl.getUserPosts)

module.exports = router