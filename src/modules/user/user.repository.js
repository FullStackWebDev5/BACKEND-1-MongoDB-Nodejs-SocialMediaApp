const { getDatabase } = require('../../config/db')
const db = getDatabase()

const createUser = async (newUser) => {
  try {
    const result = await db.collection('users').insertOne(newUser)
    return result.insertedId
  } catch (error) {
    console.log('Error inserting user', error)
    throw error
  }
}

const findUserByEmail = async (email) => {
  try {
    const result = await db.collection('users').findOne({ email })
    return result
  } catch (error) {
    console.log('Error validating user', error)
    throw error
  }
}

module.exports = {
  createUser,
  findUserByEmail
}