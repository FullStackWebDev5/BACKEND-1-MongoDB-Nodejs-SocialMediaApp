const express = require('express')
const bodyParser = require('body-parser')
const { connectToDb } = require('./src/config/db')
const userRoutes = require('./src/modules/user/user.route')

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Server is up',
    currentTime: new Date().toLocaleString()
  })
})

app.listen(3000, () => {
  console.log('Server is up ✅')
  connectToDb()
})


/*
  # Connect MongoDB to Nodejs
    - 'mongodb' package
      - MongoClient constructor is responsible for creating client
        - client = new MongoClient(MONGODB_URL)
      - client.connect(): Connecting MongoDB to Nodejs Server
      - client.db(databaseName): Returns reference to the DB
      - db.collection(collectionName): Returns reference to the collection

    - Repository: Middle layer between database and controller
    - Repository Pattern:
      - Parts
        - Repository
        - Controllers
        - Routes
    
      - Example: user
        - users.repository.js
        - users.controller.js
        - users.route.js
*/