import express from 'express'
import { login, register } from '../controller/user_controller.js'
import {
  createBook,
  removeAllBooks,
  removeSpecificBook,
} from '../controller/book_mongo_controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
//router.get('/books', getBooks)
router.post('/books', auth, createBook)
router.post('/books/removeall', auth, removeAllBooks)
router.post('/books/removespecific', auth, removeSpecificBook)

export default router
