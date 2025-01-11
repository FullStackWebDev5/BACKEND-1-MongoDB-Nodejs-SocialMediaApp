const { getDatabase } = require('../../config/db')
const db = getDatabase()
const { BSON } = require('bson')

const getAllPosts = async () => {
  try {
    const result = await db.collection('posts').find().toArray()
    return result
  } catch (error) {
    console.log('Error fetching posts', error)
    throw error
  }
}

const getPostById = async (postId) => {
  try {
    const _id = new BSON.ObjectId(postId)
    const result = await db.collection('posts').findOne({ _id })
    return result
  } catch (error) {
    console.log('Error fetching post by ID', error)
    throw error
  }
}

const getPostsByUser = async (userId) => {
  try {
    const result = await db.collection('posts').find({ userId }).toArray()
    return result
  } catch (error) {
    console.log('Error fetching post by ID', error)
    throw error
  }
}

const createPost = async (newPost) => {
  try {
    await db.collection('posts').insertOne(newPost)
  } catch (error) {
    console.log('Error creating new post', error)
    throw error
  }
}

const updatePost = async (postId, updatedPost) => {
  try {
    const _id = new BSON.ObjectId(postId)
    await db.collection('posts').updateOne({ _id }, { $set: updatedPost })
  } catch (error) {
    console.log('Error updating post', error)
    throw error
  }
}

const deletePost = async (postId) => {
  try {
    const _id = new BSON.ObjectId(postId)
    await db.collection('posts').deleteOne({ _id })
  } catch (error) {
    console.log('Error deleting post', error)
    throw error
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost
}