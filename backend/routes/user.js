import express from 'express'
import { login, register } from '../controller/user_controller.js'
import { getBooks, createBook } from '../controller/book_mongo_controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
//router.get('/books', getBooks)
router.post('/books', createBook)

export default router
