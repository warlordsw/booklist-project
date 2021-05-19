import express from 'express'
import {
  createBook,
  getAllBooks,
  removeSpecificBook,
  removeAll,
} from '../controller/book_controller.js'

const router = express.Router()

router.get('/localfile', getAllBooks)
router.post('/localfile', createBook)
router.post('/localfile/removespecific', removeSpecificBook)
router.post('/localfile/removeall', removeAll)

export default router
