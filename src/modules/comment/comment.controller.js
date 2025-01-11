const commentRepository = require('./comment.repository')

const addComment = async (req, res) => {
  try {
    const { postId, content } = req.body

    const newComment = {
      userId: req.user._id,
      postId,
      content
    }

    await commentRepository.createComment(newComment)

    res.status(201).json({
      status: 'SUCCESS',
      message: 'Comment added successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id
    
    const { content } = req.body

    const comment = await commentRepository.getCommentById(commentId)
    if(!comment) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Comment not found'
      })
    }

    const updatedComment = { ...comment }
    updatedComment.content = content

    await commentRepository.updateComment(commentId, updatedComment)

    res.json({
      status: 'SUCCESS',
      message: 'Comment updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id

    const comment = await commentRepository.getCommentById(commentId)
    if(!comment) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Comment not found'
      })
    }

    await commentRepository.deleteComment(commentId)

    res.json({
      status: 'SUCCESS',
      message: 'Comment deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

module.exports = {
  addComment,
  updateComment,
  deleteComment
}