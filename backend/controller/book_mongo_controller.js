import PostBook from '../models/postBook.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

// export const getBooks = async (req, res) => {
//   try {
//     const postBooks = await PostBook.find()
//     console.log(postBooks)

//     res.status(200).json(postBooks)
//   } catch (error) {
//     res.status(404).json({ message: error.message })
//   }
// }

export const createBook = async (req, res) => {
  const { _id, id, bookName, writerName, pageNumber } = req.body
  const bok = req.headers.authorization
  console.log(bok)

  const existingId = { _id: _id }

  try {
    const result = await User.findByIdAndUpdate(
      existingId,
      {
        $push: {
          createdBooks: [
            {
              id: id,
              bookName: bookName,
              writerName: writerName,
              pageNumber: pageNumber,
            },
          ],
        },
      },
      { new: true }
    ).exec()

    res.status(201).json(result.createdBooks)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}
