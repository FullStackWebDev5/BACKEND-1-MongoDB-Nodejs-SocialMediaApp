const express = require('express')
const userCntrl = require('./user.controller')

const router = express.Router()

router.post('/signup', userCntrl.signupUser)
router.post('/login', userCntrl.loginUser)

module.exports = router