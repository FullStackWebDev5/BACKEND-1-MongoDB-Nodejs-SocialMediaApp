const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

const client = new MongoClient(process.env.MONGODB_URL)
const dbName = 'database1'

const connectToDb = async () => {
  try {
    await client.connect()
    console.log('Database connected ✅')
  } catch (error) {
    console.log('Database error: ', error)
  }
}

const getDatabase = () => {
  const db = client.db(dbName)
  return db
}

module.exports = {
  connectToDb,
  getDatabase
}