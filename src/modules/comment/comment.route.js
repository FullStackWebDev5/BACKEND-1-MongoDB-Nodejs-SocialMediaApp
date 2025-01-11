const express = require('express')
const commentCntrl = require('./comment.controller')
const { isLoggedIn } = require('../../middlewares/user')

const router = express.Router()

router.use(isLoggedIn)

router.post('/', commentCntrl.addComment)
router.patch('/:id', commentCntrl.updateComment)
router.delete('/:id', commentCntrl.deleteComment)

module.exports = router