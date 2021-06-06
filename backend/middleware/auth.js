import jwt from 'jsonwebtoken'

//wants to like a post
//click the like button => auth middleware confirm or deny then next like controller

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    let decodedData

    if (token) {
      decodedData = jwt.verify(token, 'test')
      //sonra soru işaretsiz dene
      req.userId = decodedData?.id
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
