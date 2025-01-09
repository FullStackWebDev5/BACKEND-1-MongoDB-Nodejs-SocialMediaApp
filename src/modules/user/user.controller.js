const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRepository = require('./user.repository')

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const hashedPwd = await bcrypt.hash(password, 10)

    const newUser = {
      name,
      email,
      password: hashedPwd
    }
    const userId = await userRepository.createUser(newUser)
    console.log('User created. User ID: ' + userId)

    res.json({
      status: 'SUCCESS',
      message: `User signed up successfully`
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userRepository.findUserByEmail(email)

    if(!user) {
      return res.status(401).json({
        status: 'FAILED',
        message: 'User with given email does not exist'
      })
    }

    const doesPwdMatch = await bcrypt.compare(password, user.password)

    if(!doesPwdMatch) { 
      return res.status(401).json({
        status: 'FAILED',
        message: 'Invalid credentials'
      })
    }

    const token = jwt.sign(
      user, 
      process.env.JWT_PRIVATE_KEY, 
      { expiresIn: '15m' }
    )

    res.json({
      status: 'SUCCESS',
      message: `User ${user.name} logged in successfully`,
      token
    })
  } catch (error) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong'
    })
  }
}

module.exports = {
  signupUser,
  loginUser
}