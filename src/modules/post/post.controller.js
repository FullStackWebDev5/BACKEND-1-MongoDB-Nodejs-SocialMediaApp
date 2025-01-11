const postRepository = require('./post.repository')
const commentRepository = require('../comment/comment.repository')

const getPosts = async (req, res) => {
  try {
    const posts = await postRepository.getAllPosts()

    res.json({
      status: 'SUCCESS',
      data: posts
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const addPost = async (req, res) => {
  try {
    const { imageURL, caption } = req.body

    const newPost = {
      userId: req.user._id,
      imageURL,
      caption
    }

    await postRepository.createPost(newPost)

    res.status(201).json({
      status: 'SUCCESS',
      message: 'Post created successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id
    const { imageURL, caption } = req.body

    const post = await postRepository.getPostById(postId)
    if(!post) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Post not found'
      })
    }

    const updatedPost = { ...post }

    if(imageURL) {
      updatedPost.imageURL = imageURL
    }
    if(caption) {
      updatedPost.caption = caption
    }

    await postRepository.updatePost(postId, updatedPost)

    res.json({
      status: 'SUCCESS',
      message: 'Post updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id

    const post = await postRepository.getPostById(postId)
    if(!post) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Post not found'
      })
    }

    await postRepository.deletePost(postId)

    res.json({
      status: 'SUCCESS',
      message: 'Post deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const getPostComments =  async (req, res) => {
  try {
    const postId = req.params.id
    const comments = await commentRepository.getCommentsByPost(postId)

    res.json({
      status: 'SUCCESS',
      data: comments
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}


module.exports = {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  getPostComments
}