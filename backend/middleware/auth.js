import jwt from 'jsonwebtoken'

//wants to like a post
//click the like button => auth middleware confirm or deny then next like controller

const auth = async (req, res, next) => {
  try {
    const token = req.body.token
    //check for token
    if (!token) {
      res.status(401).json({ msg: 'Auth failed' })
    }

    //verify token
    const decoded = jwt.verify(token, 'test')

    //Add user from payload
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}

export default auth
