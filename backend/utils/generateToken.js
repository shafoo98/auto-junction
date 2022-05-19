import jwt from 'jsonwebtoken'

// Generating a JWT token for the auth process
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

export default generateToken
