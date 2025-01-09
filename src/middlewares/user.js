const jwt = require('jsonwebtoken')

const isLoggedIn = (req, res, next) => {
  try {
    const { token } = req.headers
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      status: 'FAILED',
      message: 'You have not logged in'
    })
  }
}

module.exports = { isLoggedIn }