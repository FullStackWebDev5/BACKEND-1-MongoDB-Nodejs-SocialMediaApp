const express = require('express')
const postCntrl = require('./post.controller')
const { isLoggedIn } = require('../../middlewares/user')

const router = express.Router()

router.use(isLoggedIn)

router.get('/', postCntrl.getPosts)
router.post('/', postCntrl.addPost)
router.patch('/:id', postCntrl.updatePost)
router.delete('/:id', postCntrl.deletePost)
router.get('/:id/comments', postCntrl.getPostComments)

module.exports = router




/*
  # PUT vs PATCH
    - PUT: Updates the entire resource with the request payload.
    - PATCH: Updates only the fields specified in the request payload.
    
    - Example:
      - Original data: 
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com'
        }

      - PUT update:
        - Data to update: { name: 'John Singh' }
        - Updated data: 
          { 
            id: 1, 
            name: 'John Singh' 
          }

      - PATCH update:
        - Payload: { name: 'John Singh' }
        - Updated data: 
          { 
            id: 1, 
            name: 'John Singh', 
            email: 'johnsingh@example.com' 
          }
*/