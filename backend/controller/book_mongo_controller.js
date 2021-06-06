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
  const { _id, newBook } = req.body

  const existingId = { _id: _id }

  try {
    const result = await User.findByIdAndUpdate(
      existingId,
      {
        $push: {
          createdBooks: [newBook],
        },
      },
      { new: true }
    ).exec()

    res.status(201).json(result.createdBooks)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const removeAllBooks = async (req, res) => {
  const { emptyArray, _id } = req.body

  const existingId = { _id: _id }

  try {
    const result = await User.findByIdAndUpdate(
      existingId,
      { createdBooks: emptyArray },
      { new: true }
    )
    res.status(200).json([])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const removeSpecificBook = async (req, res) => {
  const { createdBooks, _id } = req.body
  console.log(createdBooks)
  const existingId = { _id: _id }

  try {
    const result = await User.findByIdAndUpdate(
      existingId,
      {
        $pull: {
          createdBooks: createdBooks,
        },
      },
      { new: true }
    ).exec()
    res.status(200).json(result.createdBooks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
