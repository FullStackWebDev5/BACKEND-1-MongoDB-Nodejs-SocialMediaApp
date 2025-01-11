const { getDatabase } = require('../../config/db')
const db = getDatabase()
const { BSON } = require('bson')

const getCommentById = async (commentId) => {
  try {
    const _id = new BSON.ObjectId(commentId)
    const result = await db.collection('comments').findOne({ _id })
    return result
  } catch (error) {
    console.log('Error creating comment', error)
    throw error
  }
}

const getCommentsByPost = async (postId) => {
  try {
    console.log(postId)
    const result = await db.collection('comments').find({ postId }).toArray()
    return result
  } catch (error) {
    console.log('Error creating comment', error)
    throw error
  }
}


const createComment = async (newComment) => {
  try {
    await db.collection('comments').insertOne(newComment)
  } catch (error) {
    console.log('Error creating comment', error)
    throw error
  }
}

const updateComment = async (commentId, updatedComment) => {
  try {
    const _id = new BSON.ObjectId(commentId)
    await db.collection('comments').updateOne({ _id }, { $set: updatedComment })
  } catch (error) {
    console.log('Error updating comment', error)
    throw error
  }
}

const deleteComment = async (commentId) => {
  try {
    const _id = new BSON.ObjectId(commentId)
    await db.collection('comments').deleteOne({ _id })
  } catch (error) {
    console.log('Error deleting content', error)
    throw error
  }
}

module.exports = {
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost
}